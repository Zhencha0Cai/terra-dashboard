import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { FCD } from "../../../constants/constants";

const getRichList = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data } = await axios.get(`${FCD}/v1/richlist/${req.query.denom}`);
  res.json(data);
};

export default getRichList;
