import { NextApiRequest, NextApiResponse } from "next";
import BN from "bignumber.js";
import axios from "axios";
import { FCD } from "../../../constants/constants";
import client, { withRedis } from "../../../lib/redis";
import { prisma } from "../../../lib/prisma";

const getBalanceHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { account } = req.query;
    const step = (60 * 60 * 24) / 6;
    let record = await prisma.balanceHistory.findUnique({
      where: { address: account as string },
    });
    let currentHeight = new BN(record?.prev_height || 4724001 - step).plus(
      step
    );
    const {
      data: { block },
    } = await axios(`${FCD}/blocks/latest`);
    const maxHeight = block.header.height;
    const { date, balance } = JSON.parse(
      JSON.stringify(record?.balance_history || { date: [], balance: [] })
    );

    if (currentHeight.plus(step).gt(maxHeight)) {
      return res.json(record?.balance_history);
    }

    const blockHeights = [];

    while (currentHeight.lt(maxHeight)) {
      blockHeights.push(currentHeight);
      currentHeight = currentHeight.plus(step);
    }
    date.push(
      ...(await (
        await Promise.all(
          blockHeights.map((height) => axios(`${FCD}/blocks/${height}`))
        )
      ).map(({ data }) => data.block.header.time))
    );
    balance.push(
      ...(await (
        await Promise.all(
          blockHeights.map((height) =>
            axios(
              `${FCD}/cosmos/bank/v1beta1/balances/${account}?height=${height}`
            )
          )
        )
      ).map(({ data }) => data.balances))
    );

    const { data } = await axios(
      `${FCD}/cosmos/bank/v1beta1/balances/${account}?height=${maxHeight}`
    );
    date.push(block.header.time);
    balance.push(data.balances);
    const payload = {
      prev_height: maxHeight,
      address: account as string,
      balance_history: { date, balance },
    };
    const { balance_history } = await prisma.balanceHistory.upsert({
      where: {
        address: account as string,
      },
      update: payload,
      create: payload,
    });
    client.setEx(req.url as string, 60 * 60, JSON.stringify(balance_history));
    return res.json({ date, balance });
  } catch (error) {
    console.log(error);
  }
  return res.json({});
};

export default withRedis(async (req: NextApiRequest, res: NextApiResponse) =>
  getBalanceHistory(req, res)
);
