import { BigNumber } from "ethers";

export enum TransactionType {
  Deposit = "deposit",
  Withdraw = "withdraw",
}

export enum TokenType {
  MATIC = "MATIC",
}

export type Transaction = {
  id?: number;
  hash: string;
  block: number;
  type: TransactionType;
  wallet: string;
  contract: string;
  amount: string;
  token: TokenType;
  createdAt?: number;
};

export type Wallet = {
  id: string;
  address: string;
  createdAt: Date;
};
