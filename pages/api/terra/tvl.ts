import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { DEFI_Llama_URL } from "../../../constants/constants";
import client, { withRedis } from "../../../lib/redis";

interface Protocol {
  name: string;
  protocols: number;
  tvl: number | null;
  change_1h: number | null;
  change_1d: number | null;
  change_7d: number | null;
  mcap: number | null;
  mcaptvl: number | null;
  category: string;
  logo: string;
  fdv: number | null;
  chainTvls: { [key: string]: number };
  url: string;
}
const getTvl = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await axios.get(`${DEFI_Llama_URL}/protocols`);
  const result = data
    .filter(
      ({ chains, category }: { chains: string[]; category: string }) =>
        chains.includes("Terra") && category !== "Bridge"
    )
    .map(
      ({
        name,
        protocols,
        tvl,
        change_1h,
        change_1d,
        change_7d,
        mcap,
        category,
        logo,
        fdv = null,
        chainTvls,
        url,
      }: Protocol) => {
        return {
          name,
          protocols,
          tvl: chainTvls.Terra ? chainTvls.Terra : tvl,
          tvlPrevHour: change_1h,
          tvlPrevDay: change_1d,
          tvlPrevWeek: change_7d,
          mcap,
          mcaptvl: mcap && tvl ? mcap / tvl : null,
          category,
          logo,
          fdv,
          url,
        };
      }
    );
  client.setEx(req.url as string, 3 * 60, JSON.stringify(result));
  res.json(result);
};
export default withRedis(async (req: NextApiRequest, res: NextApiResponse) =>
  getTvl(req, res)
);
