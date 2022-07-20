import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { Transaction, TransactionType, TokenType } from "../../../sychronizer";

@Entity({
  name: "SupplyAave",
})
export class SupplyAaveModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hash: string;

  @Column()
  block: number;

  @Column({
    type: "enum",
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({ name: "wallet" })
  wallet: string;

  @Column({ name: "contract" })
  contract: string;

  @Column()
  amount: number;

  // TODO(ca): check if this column are required
  @Column({
    type: "enum",
    enum: TokenType,
  })
  token: TokenType;

  @CreateDateColumn()
  createdAt: Date;

  public from(t: Transaction): void {
    this.hash = t.hash;
    this.block = t.block;
    this.type = t.type;
    this.wallet = t.wallet;
    this.contract = t.contract;
    this.amount = t.amount;
    this.token = t.token;
  }

  public to(): Transaction {
    return {
      id: this.id,
      hash: this.hash,
      block: this.block,
      type: this.type,
      wallet: this.wallet,
      contract: this.contract,
      amount: this.amount,
      token: this.token,
      createdAt: this.createdAt,
    };
  }
}
