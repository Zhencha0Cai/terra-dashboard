import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { useGetTvlsQuery } from "../../services/api";
import LoadingStack from "../feedback/loadingStack";
import StackedAreaChart from "../baseCharts/stackedAreaChart";

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
      w="100%"
      h="20em"
    >
      <Heading as="h5" size="sm" textAlign={"center"}>
        {"Top TVLs"}
      </Heading>
      <StackedAreaChart ids={data.ids} data={data.data}></StackedAreaChart>
    </Box>
  );
};

export default TvlChart;
