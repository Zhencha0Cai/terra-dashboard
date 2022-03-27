import LineChart from "../baseCharts/lineChart";
import { useGetStableCoinsQuery } from "../../services/api";
import { Box, Heading } from "@chakra-ui/react";
import LoadingStack from "../feedback/loadingStack";
const StableCoinMarketCapChart = () => {
  const { data, error, isLoading } = useGetStableCoinsQuery();

  if (isLoading) {
    return <LoadingStack />;
  }
  const { ids, marketCapData } = data;
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="xl"
      p={5}
      w={["100%"]}
      h={"20em"}
    >
      <Heading as="h5" size="sm" textAlign={"center"}>
        {"Top stablecoins market cap"}
      </Heading>
      <LineChart ids={ids} data={marketCapData}></LineChart>
    </Box>
  );
};

export default StableCoinMarketCapChart;
