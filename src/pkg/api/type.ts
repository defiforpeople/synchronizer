import { Transaction, Wallet } from "../../sychronizer";
import { IDatabase } from "../database/type";

export type Context = {
  db: IDatabase;
};

type Response = {
  data?: unknown;
  meta?: unknown;
  error?: string;
};

export type DepositsResponse = Response & {
  data?: {
    deposits: Transaction[];
  };
  meta?: {
    count: number;
  };
};

export type WithdrawsResponse = Response & {
  data?: {
    withdraws: Transaction[];
  };
  meta?: {
    count: number;
  };
};

export type BalacesResponse = Response & {
  data?: {
    deposits: string;
    withdraws: string;
    balance: string;
  };
};

export type ListWalletsResponse = Response & {
  meta?: {
    count: number;
  };
};

export type LoginWalletResponse = Response & {
  data?: {
    wallet: Wallet;
  };
};
