import axios from "axios";
import { format } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { FCD } from "../../constants/constants";
import { isDenomTerraNative, readAmount } from "@terra.kitchen/utils";
import client, { withRedis } from "../../lib/redis";
interface TxVolumeData {
  datetime: number;
  txVolume: string;
}

interface TxVolumeCollection {
  [denom: string]: Array<TxVolumeData>;
}

const groupByDenom = (tx: Array<{ denom: string; data: TxVolumeData[] }>) => {
  return tx
    .filter(({ denom }) => isDenomTerraNative(denom))
    .reduce((txData: any, { denom, data }) => {
      txData[denom] = data;
      return txData;
    }, {});
};
const formatTxData = (data: TxVolumeCollection) => {
  return Object.keys(data).reduce((acc: any, key) => {
    acc[key] = data[key].map(({ datetime, txVolume }) => {
      return {
        date: format(new Date(datetime), "MM/dd/yy"),
        txVolume: parseFloat(readAmount(txVolume)),
      };
    });
    return acc;
  }, {});
};

const getTxVolume = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    data: { cumulative, periodic },
  } = await axios.get(`${FCD}/v1/dashboard/tx_volume`);
  const result = {
    ids: ["txVolume"],
    cumulative: formatTxData(groupByDenom(cumulative)),
    periodic: formatTxData(groupByDenom(periodic)),
  };
  client.setEx(req.url as string, 60, JSON.stringify(result));
  // client.set(req.url as string, JSON.stringify(result), "EX", 60);
  res.json(result);
};

export default withRedis(async (req: NextApiRequest, res: NextApiResponse) =>
  getTxVolume(req, res)
);
// export default getTxVolume;
