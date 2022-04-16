import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import LineChart from "../baseCharts/lineChart";
import { dataFormater } from "../../lib/util";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

const { RangePicker } = DatePicker;

const DepletionRateChart = ({ historicalDepletionRates }: any) => {
  const [slicedData, setSlicedData] = useState(historicalDepletionRates);
  const startDate = moment(historicalDepletionRates[0].date);
  const endDate = moment(
    historicalDepletionRates[historicalDepletionRates.length - 1].date
  );

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="xl"
      p={5}
      w={["90%"]}
      h={["90%", "90%", "60%"]}
    >
      <Flex justify={"space-between"}>
        <Heading as="h5" size="sm" textAlign={"left"} p="2">
          {"Historical Depletion Rates"}
        </Heading>
        <RangePicker
          defaultValue={[startDate, endDate]}
          disabledDate={(current) =>
            !(
              startDate.isSameOrBefore(current) &&
              endDate.isSameOrAfter(current)
            )
          }
          onChange={(dates) => {
            setSlicedData(
              historicalDepletionRates.filter(
                ({ date }: { date: string }) =>
                  moment(date).isSameOrAfter(moment(dates?.[0])) &&
                  moment(date).isSameOrBefore(moment(dates?.[1]))
              )
            );
          }}
        />
      </Flex>
      <Flex p={2}>
        <Text size={"md"}>
          {`${dataFormater(
            slicedData.slice(-1)[0]?.depletionRate
          )} Depletion Rate`}
        </Text>
      </Flex>
      <Box h="90%">
        <LineChart
          ids={["depletionRate"]}
          data={slicedData}
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

export default DepletionRateChart;
