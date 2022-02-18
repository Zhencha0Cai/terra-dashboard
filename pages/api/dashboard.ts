import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { FCD } from "../../constants/constants";
import client, { withRedis } from "../../lib/redis";

//https://github.com/alecande11/terra-discord-webhook/blob/main/realtimeData.js
const getDashBoard = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await (
    await Promise.all([
      axios.get(`${FCD}/terra/oracle/v1beta1/denoms/uusd/exchange_rate`),
      axios.get(`${FCD}/cosmos/bank/v1beta1/supply/uluna`),
      axios.get(`${FCD}/cosmos/staking/v1beta1/pool`),
    ])
  ).map(({ data }) => data);

  const {
    exchange_rate,
    amount: { amount },
    pool: { bonded_tokens },
  } = Object.assign({}, ...data);
  const total_luna = Math.round(parseInt(amount) / 1_000_000);
  const result = {
    luna_price: `$${parseFloat(exchange_rate).toFixed(2)}`,
    circulating_supply: Math.round(amount / 1_000_000),
    total_luna: Math.round(parseInt(amount) / 1_000_000),
    staked_percent: `${(
      (Math.round(parseInt(bonded_tokens) / 1_000_000) / total_luna) *
      100
    ).toFixed(2)}%`,
  };
  client.setEx(req.url as string, 60, JSON.stringify(result));
  // client.set(req.url as string, JSON.stringify(data), "EX", 60);
  res.json(result);
};
export default withRedis(async (req: NextApiRequest, res: NextApiResponse) =>
  getDashBoard(req, res)
);
// export default getDashBoard;
