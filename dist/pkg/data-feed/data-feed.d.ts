import { Provider } from "@ethersproject/abstract-provider";
import { BigNumber } from "ethers";
export default class DataFeed {
    private contract;
    constructor(provider: Provider, address: string);
    getPrice(): Promise<BigNumber>;
}
