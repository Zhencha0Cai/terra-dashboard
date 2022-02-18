import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";
const client = createClient({ url: process.env.REDIS_URL });
(async () => {
  await client.connect();
})();
client.on("error", console.log);
export const withRedis =
  (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    const value = await client.get(req.url as string);
    if (value) {
      return res.status(200).json(value);
    }
    return handler(req, res);
  };

export default client;
