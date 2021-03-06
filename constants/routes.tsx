import { FcComboChart } from "react-icons/fc";
import { GrMoney } from "react-icons/gr";
import StableCoinMarketCapChart from "../components/customCharts/stableCoinMarketCapChart";
import TvlChart from "../components/customCharts/tvlsChart";
import TxVolumeChart from "../components/customCharts/txVolumeChart";
import WalletGrowthChart from "../components/customCharts/walletGrowthChart";
import RichList from "../pages/richlist";
import TerraIcon from "../icons/terraIcon";
import AnchorIcon from "../icons/anchorIcon";
import Anchor from "../pages/anchor";
import LFGIcon from "../icons/LFG";
import TerraTvl from "../pages/terraTvl";

export const ROUTES_PATH = {
  CROSS_CHAIN: "/cross-chain",
  get TVL() {
    return [this.CROSS_CHAIN, "tvl"].join("/");
  },
  get STABLE_COIN_MARKET_CAP() {
    return [this.CROSS_CHAIN, "stable-coin-market-cap"].join("/");
  },
  ANCHOR: "/anchor",
  TERRA: "/terra",
  get TX() {
    return [this.TERRA, "tx"].join("/");
  },
  get WALLET_GROWTH() {
    return [this.TERRA, "wallet-growth"].join("/");
  },
  get TERRA_TVL() {
    return [this.TERRA, "tvl"].join("/");
  },
  RICH_LIST: "/richlist",
  LFG: "/lfg",
};

export const routes = [
  {
    href: ROUTES_PATH.ANCHOR,
    title: "Anchor",
    icon: AnchorIcon,
    subRoutes: [],
  },
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
        title: "Total Value Locked (TVL)",
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
      {
        href: ROUTES_PATH.TERRA_TVL,
        title: "Protocol TVL",
      },
    ],
  },
  {
    href: ROUTES_PATH.RICH_LIST,
    title: "Rich List",
    icon: GrMoney,
    subRoutes: [],
  },
  {
    href: ROUTES_PATH.LFG,
    title: "Luna Foundation Guard (LFG)",
    icon: LFGIcon,
    subRoutes: [],
  },
];

export const routeToComponent = {
  [ROUTES_PATH.TVL]: TvlChart,
  [ROUTES_PATH.STABLE_COIN_MARKET_CAP]: StableCoinMarketCapChart,
  [ROUTES_PATH.ANCHOR]: Anchor,
  [ROUTES_PATH.TX]: TxVolumeChart,
  [ROUTES_PATH.WALLET_GROWTH]: WalletGrowthChart,
  [ROUTES_PATH.RICH_LIST]: RichList,
  [ROUTES_PATH.LFG]: RichList,
  [ROUTES_PATH.TERRA_TVL]: TerraTvl,
};

export const DEFAULT_ROUTE = ROUTES_PATH.STABLE_COIN_MARKET_CAP;
