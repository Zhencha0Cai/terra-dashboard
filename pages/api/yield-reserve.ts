import { format } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import client, { withRedis } from "../../lib/redis";

export const getYieldReserve = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let data = await prisma.mmOverseerEpochStates.findMany({
    select: {
      prev_interest_buffer: true,
      createdAt: true,
    },
  });
  const result = {
    ids: ["yieldReserve"],
    yieldReserveData: data.map(({ prev_interest_buffer, createdAt }) => {
      return {
        yieldReserve: parseInt(prev_interest_buffer) / 1000_000,
        date: format(createdAt, "MM/dd/yyyy"),
      };
    }),
  };
  if (result.yieldReserveData.length > 0) {
    client.setEx(req.url as string, 60 * 60, JSON.stringify(result));
  }
  return res.json(result);
};
export default withRedis(async (req: NextApiRequest, res: NextApiResponse) =>
  getYieldReserve(req, res)
);
