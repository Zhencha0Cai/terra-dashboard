import { Box, Heading } from "@chakra-ui/react";
import { useGetYieldReserveQuery } from "../../services/api";
import LineChart from "../baseCharts/lineChart";
import LoadingStack from "../loadingStack";

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
      w="100%"
      h="20em"
    >
      <Heading as="h5" size="sm" textAlign={"center"}>
        {"Anchor Yield Reserve"}
      </Heading>
      <LineChart ids={ids} data={yieldReserveData}></LineChart>
    </Box>
  );
};

export default YieldReserveChart;
