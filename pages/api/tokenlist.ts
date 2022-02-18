import { readDenom } from "@terra.kitchen/utils";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { FCD } from "../../constants/constants";
import client, { withRedis } from "../../lib/redis";

const getTokenList = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.headers.host, req.url, "getTokenList");
  const {
    data: { actives },
  } = await axios.get(`${FCD}/terra/oracle/v1beta1/denoms/actives`);
  const data = actives.map((denom: string) => {
    return {
      denom,
      url: `https://assets.terra.money/icon/svg/Terra/${readDenom(
        denom
      ).toUpperCase()}.svg`,
    };
  });
  data.push({
    denom: "uluna",
    url: "https://assets.terra.money/icon/svg/Luna.svg",
  });
  client.setEx(req.url as string, 60 * 60 * 24, JSON.stringify(data));
  res.json(data);
};

export default withRedis(async (req: NextApiRequest, res: NextApiResponse) =>
  getTokenList(req, res)
);
