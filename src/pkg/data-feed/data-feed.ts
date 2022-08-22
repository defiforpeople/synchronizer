import { Provider } from "@ethersproject/abstract-provider";
import { AggregatorV3Interface, AggregatorV3Interface__factory } from "../../typechain/aggregator-v3";
import { BigNumber, ethers } from "ethers";

export default class DataFeed {
  private contract: AggregatorV3Interface;

  constructor(provider: Provider, address: string) {
    this.contract = new ethers.Contract(address, AggregatorV3Interface__factory.abi, provider) as AggregatorV3Interface;
  }

  public async getPrice(): Promise<BigNumber> {
    const [, price] = await this.contract.latestRoundData();

    return price;
  }
}
