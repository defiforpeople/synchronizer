import { Transaction, TransactionType, Wallet } from "../../sychronizer";

export const ERROR_MSG_NOT_INITIALIZED = "db are not initalized";

export interface IDatabase {
  connect(): Promise<void>;
  close(): Promise<void>;
  insertTransactions(t: Transaction[]): Promise<Transaction[]>;
  depositsByContractId(wallet: string, contract: string): Promise<Transaction[]>;
  withdrawsByContractId(wallet: string, contract: string): Promise<Transaction[]>;
  listWallets(): Promise<string[]>;
  login(wallet: string): Promise<Wallet>;
  listTransactionsByHashes(hashes: string[]): Promise<Transaction[]>;
  getLastTransactionByType(type: TransactionType): Promise<Transaction>;
}
