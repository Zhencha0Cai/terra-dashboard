import axios from "axios";
import { format } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { FCD } from "../../constants/constants";

interface AccountData {
  datetime: number;
  value: number;
}

const formatDate = (data: AccountData[]) => {
  return data.map(({ datetime, value }) => {
    return {
      date: format(datetime, "MM/dd/yy"),
      value,
    };
  });
};

const getWalletGrowth = async (_: NextApiRequest, res: NextApiResponse) => {
  const { data: registeredAccounts } = await axios.get(
    `${FCD}/v1/dashboard/registered_accounts`
  );
  const { data: activeAccounts } = await axios.get(
    `${FCD}/v1/dashboard/active_accounts`
  );
  const result = {
    ids: ["value"],
    periodic: {
      total: formatDate(registeredAccounts.periodic),
      active: formatDate(activeAccounts.periodic),
    },
    cumulative: {
      total: formatDate(registeredAccounts.cumulative),
    },
  };
  return res.json(result);
};

export default getWalletGrowth;
