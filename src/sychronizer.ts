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
  amount: number;
  token: TokenType;
  createdAt?: Date;
};

export type Wallet = {
  id: string;
  address: string;
  createdAt: Date;
};
