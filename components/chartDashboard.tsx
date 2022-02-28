import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import StableCoinMarketCapChart from "./customCharts/stableCoinMarketCapChart";
import TvlChart from "./customCharts/tvlsChart";
import TxVolumeChart from "./customCharts/txVolumeChart";
import WalletGrowthChart from "./customCharts/walletGrowthChart";
import YieldReserveChart from "./customCharts/yieldReserveChart";
const ChartDashboard = () => {
  return (
    <Wrap
      w={"100%"}
      mx={"auto"}
      justify={{ base: "center", md: "center", lg: "space-between" }}
      mb="5em"
    >
      <WrapItem w={["100%", "100%", "100%", "48%"]}>
        <StableCoinMarketCapChart />
      </WrapItem>
      <WrapItem w={["100%", "100%", "100%", "48%"]}>
        <TvlChart />
      </WrapItem>
      <WrapItem w={["100%", "100%", "100%", "48%"]}>
        <YieldReserveChart />
      </WrapItem>
      <WrapItem w={["100%", "100%", "100%", "48%"]}>
        <TxVolumeChart />
      </WrapItem>
      <WrapItem w={["100%", "100%", "100%", "48%"]}>
        <WalletGrowthChart />
      </WrapItem>
    </Wrap>
  );
};

export default ChartDashboard;
