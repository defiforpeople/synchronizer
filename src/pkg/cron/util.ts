import { ethers, BigNumber } from "ethers";
import { TokenType, Transaction, TransactionType } from "../../sychronizer";

type TransactionRaw = [userAddr: string, amount: BigNumber];

export const toTransaction = (e: ethers.Event, type: TransactionType): Transaction => {
  // check args from event
  if (!e.args?.length) {
    throw new Error("couldn't create the transaction, err=invalid args length");
  }

  // parse transaction from event
  const [userAddr, amount] = e.args as TransactionRaw;

  return {
    hash: e.transactionHash,
    block: e.blockNumber,
    type,
    wallet: userAddr,
    contract: e.address,
    amount: amount.toNumber(),
    token: TokenType.MATIC,
  };
};
