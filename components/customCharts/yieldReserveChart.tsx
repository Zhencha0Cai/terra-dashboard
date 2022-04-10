import { Box, Flex, Heading } from "@chakra-ui/react";
import { dataFormater } from "../../lib/util";
import { useGetYieldReserveQuery } from "../../services/api";
import LineChart from "../baseCharts/lineChart";
import LoadingStack from "../feedback/loadingStack";

const YieldReserveChart = () => {
  const { data, error, isLoading } = useGetYieldReserveQuery();

  if (isLoading) {
    return <LoadingStack />;
  }
  const { ids, yieldReserveData } = data;
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="xl"
      p={5}
      w={["90%"]}
      h={"60%"}
    >
      <Heading as="h5" size="sm" textAlign={"left"} p="2">
        {"Anchor Yield Reserve"}
      </Heading>
      <Flex p={2}>
        <Heading size={"md"}>
          {dataFormater(yieldReserveData.slice(-1)[0]?.yieldReserve)}
        </Heading>
      </Flex>
      <Box h="90%">
        <LineChart
          ids={ids}
          data={yieldReserveData}
          yAxisProps={{
            label: {
              value: "UST",
              angle: -90,
              position: "insideLeft",
              style: {
                fill: "gray",
              },
            },
            width: 80,
          }}
        ></LineChart>
      </Box>
    </Box>
  );
};

export default YieldReserveChart;
