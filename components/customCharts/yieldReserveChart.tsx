import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { dataFormater } from "../../lib/util";
import { YieldReserveResponse } from "../../types/response";
import LineChart from "../baseCharts/lineChart";

const YieldReserveChart = ({ ids, yieldReserveData }: YieldReserveResponse) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="xl"
      p={5}
      w={["90%"]}
      h={["90%", "90%", "60%"]}
    >
      <Heading as="h5" size="sm" textAlign={"left"} p="2">
        {"Anchor Yield Reserve"}
      </Heading>
      <Flex p={2}>
        <Text size={"md"}>
          {dataFormater(yieldReserveData.slice(-1)[0]?.yieldReserve)}
        </Text>
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
