import { FcComboChart } from "react-icons/fc";
import { GrMoney } from "react-icons/gr";
import StableCoinMarketCapChart from "../components/customCharts/stableCoinMarketCapChart";
import TvlChart from "../components/customCharts/tvlsChart";
import TxVolumeChart from "../components/customCharts/txVolumeChart";
import WalletGrowthChart from "../components/customCharts/walletGrowthChart";
import YieldReserveChart from "../components/customCharts/yieldReserveChart";
import RichList from "../pages/richlist";
import TerraIcon from "../icons/terraIcon";
import AnchorIcon from "../icons/anchorIcon";

export const ROUTES_PATH = {
  CROSS_CHAIN: "/cross-chain",
  get TVL() {
    return [this.CROSS_CHAIN, "tvl"].join("/");
  },
  get STABLE_COIN_MARKET_CAP() {
    return [this.CROSS_CHAIN, "stable-coin-market-cap"].join("/");
  },
  ANCHOR: "/anchor",
  get YIELD_RESERVE() {
    return [this.ANCHOR, "yield-reserve"].join("/");
  },
  TERRA: "/terra",
  get TX() {
    return [this.TERRA, "tx"].join("/");
  },
  get WALLET_GROWTH() {
    return [this.TERRA, "wallet-growth"].join("/");
  },
  RICH_LIST: "/richlist",
};

export const routes = [
  {
    href: ROUTES_PATH.CROSS_CHAIN,
    title: "Cross Chain",
    icon: FcComboChart,
    subRoutes: [
      {
        href: ROUTES_PATH.STABLE_COIN_MARKET_CAP,
        title: "Stable Coin Market Cap",
      },
      {
        href: ROUTES_PATH.TVL,
        title: "Total Value Locked",
      },
    ],
  },
  {
    href: ROUTES_PATH.ANCHOR,
    title: "Anchor",
    icon: AnchorIcon,
    subRoutes: [
      {
        href: ROUTES_PATH.YIELD_RESERVE,
        title: "Yield Reserve",
      },
    ],
  },
  {
    href: ROUTES_PATH.TERRA,
    title: "Terra",
    icon: TerraIcon,
    subRoutes: [
      {
        href: ROUTES_PATH.TX,
        title: "Transaction Volumne",
      },
      {
        href: ROUTES_PATH.WALLET_GROWTH,
        title: "Wallet Growth",
      },
    ],
  },
  {
    href: ROUTES_PATH.RICH_LIST,
    title: "Rich List",
    icon: GrMoney,
    subRoutes: [],
  },
];

export const routeToComponent = {
  [ROUTES_PATH.TVL]: TvlChart,
  [ROUTES_PATH.STABLE_COIN_MARKET_CAP]: StableCoinMarketCapChart,
  [ROUTES_PATH.YIELD_RESERVE]: YieldReserveChart,
  [ROUTES_PATH.TX]: TxVolumeChart,
  [ROUTES_PATH.WALLET_GROWTH]: WalletGrowthChart,
  [ROUTES_PATH.RICH_LIST]: RichList,
};

export const DEFAULT_ROUTE = ROUTES_PATH.STABLE_COIN_MARKET_CAP;
