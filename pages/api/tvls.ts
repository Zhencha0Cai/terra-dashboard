import axios from "axios";
import { add, format, fromUnixTime, isAfter, isBefore, sub } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { DEFI_Llama_URL } from "../../constants/constants";
import client, { withRedis } from "../../lib/redis";

const filterDate = (data: any, start: any, end: any) => {
  return data.filter(({ date }: { date: string }) => {
    const d = fromUnixTime(parseInt(date));
    return isAfter(d, start) && isBefore(d, end);
  });
};

const getSingleChainTvl = async (name: string, start: Date, end: Date) => {
  return {
    ...(await axios({
      baseURL: DEFI_Llama_URL,
      url: `/charts/${name}`,
      transformResponse: [
        function (data) {
          try {
            return filterDate(JSON.parse(data), start, end);
          } catch (error) {
            console.log(error);
          }
        },
      ],
    })),
  };
};

const getTopChains = async () => {
  const start = sub(new Date(), { months: 1 });
  const end = add(new Date(), { days: 1 });
  const { data } = await axios.get(`${DEFI_Llama_URL}/chains`);
  const topChains = data
    .sort((d1: { tvl: number }, d2: { tvl: number }) => d2.tvl - d1.tvl)
    .slice(0, 5)
    .map(async ({ name }: { name: string }) => {
      return {
        name,
        data: await getSingleChainTvl(name, start, end),
      };
    });
  return await Promise.all(topChains);
};
const formatTvlData = (chainData: Array<any>) => {
  const map = new Map();
  const ids = new Set();
  for (const { name, data } of chainData) {
    ids.add(name);
    data.data.forEach((obj: any) => {
      const date = format(fromUnixTime(parseInt(obj.date)), "MM/dd/yyyy");
      map.set(date, {
        ...(map.get(date) || { date }),
        [name]: obj.totalLiquidityUSD,
      });
    });
  }
  return { ids: Array.from(ids.values()), data: Array.from(map.values()) };
};

const getTvls = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = formatTvlData(await getTopChains());
  client.setEx(req.url as string, 60, JSON.stringify(result));
  res.status(200).json(result);
};

export default withRedis(async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.headers.host, req.url, "getTvls");
  return getTvls(req, res);
});
