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
};

export type WithdrawResponse = Response & {
  data?: {
    withdraws: Transaction[];
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
