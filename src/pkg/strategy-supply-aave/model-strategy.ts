import { TokenSymbol } from "../../synchronizer";
import { Column, Entity, OneToMany } from "typeorm";
import { StrategyModel } from "../strategy/model-strategy";
import { SupplyAaveEventModel } from "./model-event";
import { SupplyAaveStrategy } from "./type";

@Entity({
  name: "supply_aave_strategy",
})
export class SupplyAaveStrategyModel extends StrategyModel {
  @Column({ type: "text" })
  symbol: TokenSymbol;

  @Column({ type: "text" })
  address: string;

  @OneToMany(() => SupplyAaveEventModel, (event) => event.strategy)
  events: SupplyAaveEventModel[];

  public from(s: SupplyAaveStrategy): void {
    this.id = s.id!;
    this.name = s.name;
    this.network = s.network;
    this.contract = s.contract;

    this.symbol = s.data.token.symbol;
    this.address = s.data.token.address;
  }

  public to(): SupplyAaveStrategy {
    return {
      id: this.id,
      name: this.name,
      network: this.network,
      contract: this.contract,
      data: {
        token: {
          symbol: this.symbol,
          address: this.address,
        },
      },
    };
  }
}