import { TokenAmount } from "./common";

export interface BalanceHistory {
  balance: TokenAmount[][];
  date: string[];
}

export interface YieldReserve {
  yieldReserve: number;
  date: string;
}

export interface YieldReserveResponse {
  ids: string[];
  yieldReserveData: YieldReserve[];
}
