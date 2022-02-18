import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { FCD } from "../../../constants/constants";
import client, { withRedis } from "../../../lib/redis";

const getRichList = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await axios.get(`${FCD}/v1/richlist/${req.query.denom}`);
  // client.set(req.url as string, JSON.stringify(data), "EX", 60);
  res.json(data);
};
// export default withRedis(async (req: NextApiRequest, res: NextApiResponse) =>
//   getRichList(req, res)
// );

export default getRichList;
