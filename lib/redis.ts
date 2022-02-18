import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";

const client = createClient();
(async () => {
  await client.connect();
})();

export const withRedis =
  (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.headers.host, req.url);
    const value = await client.get(req.url as string);
    console.log(value);
    if (value) {
      return res.status(200).json(value);
    }
    return handler(req, res);
  };

export default client;
