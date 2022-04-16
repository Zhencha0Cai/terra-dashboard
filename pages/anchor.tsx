import YieldReserveChart from "../components/customCharts/yieldReserveChart";
import { useGetYieldReserveQuery } from "../services/api";
import { Box, VStack } from "@chakra-ui/react";
import { dataFormater } from "../lib/util";
import Dashboard from "../components/dashboard";
import { YieldReserve } from "../types/response";
import DepletionRateChart from "../components/customCharts/depletionRateChart";
import Spinner from "../components/feedback/customSpinner";

const getHistoricalDepletionRates = (yieldReserveData: YieldReserve[]) => {
  if (!yieldReserveData) return {};
  const dailyChanges = [];
  let numOfDays = 21;
  for (
    let i = 1, startAmount = yieldReserveData[0].yieldReserve;
    i < yieldReserveData.length;
    i++
  ) {
    const date = yieldReserveData[i].date;
    if (date !== yieldReserveData[i - 1].date) {
      const dailyChange = {
        depletionRate: yieldReserveData[i].yieldReserve - startAmount,
        date,
      };
      startAmount = yieldReserveData[i].yieldReserve;

      dailyChanges.push(dailyChange);
    }
  }
  let sum = 0;
  for (let i = 0; i < numOfDays; i++) {
    sum += dailyChanges[i].depletionRate;
  }
  const avgDeleption = [
    { depletionRate: sum / 21, date: dailyChanges[20].date },
  ];
  let i = 0,
    j = 21;
  while (j < dailyChanges.length) {
    sum -= dailyChanges[i++].depletionRate;
    sum += dailyChanges[j++].depletionRate;
    avgDeleption.push({
      depletionRate: sum / numOfDays,
      date: dailyChanges[j - 1].date,
    });
  }
  return {
    historicalDepletionRates: avgDeleption,
    dashboardData: {
      "Reserve in UST": dataFormater(
        yieldReserveData.slice(-1)[0]?.yieldReserve
      ),
      "Depletion Rate Per Day (Avg of last 21days)": dataFormater(
        avgDeleption[avgDeleption.length - 1].depletionRate
      ),
      "Runway(in Days)": Math.floor(
        Math.abs(
          yieldReserveData.slice(-1)[0]?.yieldReserve /
            avgDeleption[avgDeleption.length - 1].depletionRate
        )
      ),
    },
  };
};
const Anchor = () => {
  const { data, error, isLoading } = useGetYieldReserveQuery();

  if (isLoading) {
    return <Spinner />;
  }
  const { ids, yieldReserveData } = data;
  const { historicalDepletionRates, dashboardData } =
    getHistoricalDepletionRates(yieldReserveData);
  return (
    <VStack w={"100%"} h="100%" overflowY={"scroll"} pb="5%">
      <Box w={["90%"]}>
        <Dashboard data={dashboardData} />
      </Box>
      <YieldReserveChart ids={ids} yieldReserveData={yieldReserveData} />
      <DepletionRateChart historicalDepletionRates={historicalDepletionRates} />
    </VStack>
  );
};

export default Anchor;
