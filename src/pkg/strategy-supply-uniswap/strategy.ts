import { AddressAndNetwork, Network } from "../../synchronizer";
import { EventType } from "../strategy/type";
import { SupplyUniswapEvent, SupplyUniswapStrategy } from "./type";
import { ISupplyUniswapStrategy } from "./interface";
import { ISupplyUniswapStorage } from "./interface";
import { Contract } from "ethers";
import { Cron } from "./cron";

export class Strategy implements ISupplyUniswapStrategy {
  private _strategy: SupplyUniswapStrategy;
  private _storage: ISupplyUniswapStorage;
  private _cron: Cron;

  constructor(strategy: SupplyUniswapStrategy, storage: ISupplyUniswapStorage, intervalMs: number, contract: Contract) {
    this._strategy = strategy;
    this._storage = storage;
    this._cron = new Cron(strategy, intervalMs, contract, this._storage);
  }

  public get strategy(): SupplyUniswapStrategy {
    return this._strategy;
  }

  get network(): Network {
    return this._strategy.network;
  }

  get contract(): string {
    return this._strategy.contract;
  }

  public async init(): Promise<void> {
    // get latest deposit/withdraw events from db
    const latestDeposit = await this._storage.getLastEventByType(this._strategy.id!, EventType.Deposit);
    const latestWithdraw = await this._storage.getLastEventByType(this._strategy.id!, EventType.Withdraw);

    await this._cron.init(latestDeposit, latestWithdraw);
  }

  public async close(): Promise<void> {
    await this._storage.close();
    await this._cron.close();
  }

  public async insertEvents(tt: SupplyUniswapEvent[]): Promise<SupplyUniswapEvent[]> {
    return this._storage.insertEvents(tt);
  }

  public async listEvents(wallet: string, type: EventType): Promise<SupplyUniswapEvent[]> {
    return this._storage.listEvents(this._strategy.id!, wallet, type);
  }

  public async listEventsByHashes(hashes: string[]): Promise<SupplyUniswapEvent[]> {
    return this._storage.listEventsByHashes(this._strategy.id!, hashes);
  }

  public async getLastEventByType(type: EventType): Promise<SupplyUniswapEvent> {
    return this._storage.getLastEventByType(this._strategy.id!, type);
  }

  public async getTokensAddresses(): Promise<AddressAndNetwork[]> {
    const strategies = await this._storage.listStrategies(this._strategy.network);

    return strategies.reduce((addrs, s) => {
      const {
        token0: { address: token0Address },
        token1: { address: token1Address },
      } = s.data;

      return [
        ...addrs,
        {
          address: token0Address,
          network: this._strategy.network,
        },
        {
          address: token1Address,
          network: this._strategy.network,
        },
      ];
    }, [] as AddressAndNetwork[]);
  }
}
