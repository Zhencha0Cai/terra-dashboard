import { NextApiRequest, NextApiResponse } from "next";
import BN from "bignumber.js";
import axios from "axios";
import { FCD } from "../../../constants/constants";
import { withRedis } from "../../../lib/redis";
import { prisma } from "../../../lib/prisma";

const getBalanceChange = async (req: NextApiRequest, res: NextApiResponse) => {
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
    while (currentHeight.lt(maxHeight)) {
      const {
        data: { block },
      } = await axios(`${FCD}/blocks/${currentHeight}`);
      const { data } = await axios(
        `${FCD}/cosmos/bank/v1beta1/balances/${account}?height=${currentHeight}`
      );
      date.push(block.header.time);
      balance.push(data.balances);
      currentHeight = currentHeight.plus(step);
    }
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
    const a = await prisma.balanceHistory.upsert({
      where: {
        address: account as string,
      },
      update: payload,
      create: payload,
    });
    return res.json({ ids: ["balance"], date, balance });
  } catch (error) {
    console.log(error);
  }
  return res.json({});
};

export default withRedis(async (req: NextApiRequest, res: NextApiResponse) =>
  getBalanceChange(req, res)
);
