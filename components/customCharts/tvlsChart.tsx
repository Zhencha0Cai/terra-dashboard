import { Box, Flex, Heading, Tooltip, Text } from "@chakra-ui/react";
import React from "react";
import { useGetTvlsQuery } from "../../services/api";
import LoadingStack from "../feedback/loadingStack";
import StackedAreaChart from "../baseCharts/stackedAreaChart";
import { dataFormater } from "../../lib/util";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const TvlChart = () => {
  const { data, error, isLoading } = useGetTvlsQuery();

  if (isLoading) {
    return <LoadingStack />;
  }
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="xl"
      p={5}
      w={["90%"]}
      h={["90%", "90%", "60%"]}
    >
      <Heading as="h2" size="sm" textAlign={"left"} p="2">
        {"Top TVL Chains "}
        <Tooltip label="Data Source: DefiLlama">
          <InfoOutlineIcon />
        </Tooltip>
      </Heading>
      <Flex p="2">
        {data.ids.map((id: string) => {
          return (
            <Text size={"md"} key={id} pr="2">
              {`${id}: ${dataFormater(data.data.slice(-1)[0][id])}`}
            </Text>
          );
        })}
      </Flex>
      <Box h="90%">
        <StackedAreaChart
          ids={data.ids}
          data={data.data}
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
        ></StackedAreaChart>
      </Box>
    </Box>
  );
};

export default TvlChart;
