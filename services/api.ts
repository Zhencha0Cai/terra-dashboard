import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BalanceHistory } from "../types/response";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getStableCoins: builder.query<any, void>({
      query: () => "stablecoins",
    }),
    getTvls: builder.query<any, void>({
      query: () => "tvls",
    }),
    getYieldReserve: builder.query<any, void>({
      query: () => "yield-reserve",
    }),
    getDashboard: builder.query<any, void>({
      query: () => "dashboard",
    }),
    getTxVolume: builder.query<any, void>({
      query: () => "tx-volume",
    }),
    getTokenList: builder.query<any, void>({
      query: () => "tokenlist",
    }),
    getRichList: builder.query<any, string>({
      query: (denom) => `richlist/${denom}`,
    }),
    getWalletGrowth: builder.query<any, void>({
      query: () => "wallet-growth",
    }),
    getBalanceChange: builder.query<BalanceHistory, string>({
      query: (account) => `balance/${account}`,
    }),
  }),
});

export const {
  useGetStableCoinsQuery,
  useGetTvlsQuery,
  useGetYieldReserveQuery,
  useGetDashboardQuery,
  useGetTxVolumeQuery,
  useGetTokenListQuery,
  useGetRichListQuery,
  useGetWalletGrowthQuery,
  useGetBalanceChangeQuery,
} = api;
