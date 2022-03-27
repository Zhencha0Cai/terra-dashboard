import { TokenAmount } from "./common";

export interface BalanceHistory {
  balance: TokenAmount[][];
  date: string[];
}
