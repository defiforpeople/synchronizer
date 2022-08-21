import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Network } from "../../synchronizer";

@Entity({
  name: "strategy",
})
export class StrategyModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  network: Network;

  @Column({ type: "text" })
  contract: string;
}
