import LineChart from "../baseCharts/lineChart";
import { useGetStableCoinsQuery } from "../../services/api";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import LoadingStack from "../feedback/loadingStack";
import { dataFormater } from "../../lib/util";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const StableCoinMarketCapChart = () => {
  const { data, error, isLoading } = useGetStableCoinsQuery();

  if (isLoading || !data) {
    return <LoadingStack />;
  }
  const { metaData, marketCapData } = data;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="xl"
      p={5}
      w={["90%"]}
      h={["90%", "90%", "60%"]}
    >
      <Heading as="h2" size="sm" textAlign={"left"} p={2}>
        {"Top stablecoins market cap "}
        <Tooltip label="Data Source: CoinGecko">
          <InfoOutlineIcon />
        </Tooltip>
      </Heading>
      <Flex p={2}>
        {metaData.map(({ id, name }: { id: string; name: string }) => {
          return (
            <>
              <Text size={"md"} key={name} pr="2">
                {`${name}: ${dataFormater(marketCapData.slice(-1)[0][id])}`}
              </Text>
            </>
          );
        })}
      </Flex>
      <Box h="90%">
        <LineChart
          ids={metaData?.map(({ id }: { id: string }) => id)}
          data={marketCapData}
          yAxisProps={{
            label: {
              value: "USD",
              angle: -90,
              position: "left",
              style: {
                textAnchor: "middle",
                fill: "gray",
              },
            },
          }}
        ></LineChart>
      </Box>
    </Box>
  );
};

export default StableCoinMarketCapChart;
