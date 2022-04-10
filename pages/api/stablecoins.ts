import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { sub, format, add, isBefore, parse, parseISO } from "date-fns";
import client, { withRedis } from "../../lib/redis";
import { COINGECKO_URL } from "../../constants/constants";

interface MetaData {
  id: string;
  name: string;
  image: string;
  symbol: string;
}

const getCoinMarketCap = async (id: String, date: string) => {
  const { data } = await axios({
    url: `/coins/${id}/history`,
    baseURL: COINGECKO_URL,
    method: "get",
    params: {
      date,
    },
    transformResponse: [
      function (data) {
        try {
          const { id, market_data } = JSON.parse(data);
          const parsedDate = parse(date, "dd-MM-yyyy", new Date());
          const formatedDate = format(parsedDate, "MM/dd/yyyy");
          return {
            id,
            [id]: market_data.market_cap.usd,
            date: formatedDate,
          };
        } catch (error) {
          console.log(error);
          return {};
        }
      },
    ],
  });
  return { ...data };
};

const getCoinsMarketCapRange = async (
  metaData: MetaData[],
  startDate: Date,
  endDate: Date
) => {
  try {
    let res = [];
    for (
      let currentDate = startDate;
      isBefore(currentDate, endDate);
      currentDate = add(currentDate, { months: 1 })
    ) {
      res.push(
        ...metaData.map(({ id }) =>
          getCoinMarketCap(id, format(currentDate, "dd-MM-yyyy"))
        )
      );
    }
    return await Promise.all(res);
  } catch (error) {
    console.log(error);
  }
};

const getStableCoins = async (req: NextApiRequest, res: NextApiResponse) => {
  const endDate = add(new Date(), { months: 1 });
  const startDate = sub(new Date(), { months: 6 });
  const { data } = await axios.get(
    `${COINGECKO_URL}/coins/markets?vs_currency=usd&category=stablecoins&order=market_cap_desc`
  );

  const metaData = data
    .slice(0, 5)
    .map(({ id, name, image, symbol }: MetaData) => {
      return {
        id,
        name,
        image,
        symbol,
      };
    });
  let marketCapData =
    (await getCoinsMarketCapRange(metaData, startDate, endDate)) || [];
  marketCapData = Object.values(
    marketCapData.reduce((obj, data) => {
      if (!obj[data.date]) {
        obj[data.date] = {};
      }
      obj[data.date]["date"] = format(new Date(data.date), "yyyy-MM-dd");
      obj[data.date][data.id] = data[data.id];
      obj[data.date];
      return obj;
    }, {})
  );
  const result = { metaData, marketCapData };
  client.setEx(req.url as string, 60, JSON.stringify(result));
  res.status(200).json(result);
};

export default withRedis(async (req: NextApiRequest, res: NextApiResponse) =>
  getStableCoins(req, res)
);
