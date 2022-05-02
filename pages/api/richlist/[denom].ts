import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { FCD } from "../../../constants/constants";
import client, { withRedis } from "../../../lib/redis";

const getRichList = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await axios.get(`${FCD}/v1/richlist/${req.query.denom}`);
  client.setEx(req.url as string, 60 * 60, JSON.stringify(data));
  res.json(data);
};
export default withRedis(async (req: NextApiRequest, res: NextApiResponse) =>
  getRichList(req, res)
);
