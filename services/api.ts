import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const publicUrl = process.env.DEPLOY_URL || process.env.DEPLOY_URL;
const host =
  publicUrl && !publicUrl.includes("localhost")
    ? `${publicUrl}`
    : "http://localhost:3000";
console.log(host, "host");
console.log(publicUrl, "publicUrl");
console.log(process.env, "env");
console.log(process.env.URL, "process.env.URL");
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://romantic-mccarthy-0b44f4.netlify.app/api/`,
  }),
  endpoints: (builder) => ({
    getStableCoins: builder.query<any, void>({
      query: () => "stablecoins",
    }),
    getTvls: builder.query<any, void>({
      query: () => "tvls",
    }),
    getYieldReserve: builder.query<any, void>({
      query: () => "yieldReserve",
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
} = api;
