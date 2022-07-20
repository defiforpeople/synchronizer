import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { Wallet } from "../../../sychronizer";

@Entity({
  name: "Wallet",
})
export class WalletModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  address: string; // DISTINC

  @CreateDateColumn()
  createdAt: Date;

  public from(t: Wallet): void {
    this.id = t.id;
    this.address = t.address;
    this.createdAt = t.createdAt;
  }

  public to(): Wallet {
    return {
      id: this.id,
      address: this.address,
      createdAt: this.createdAt,
    };
  }
}
