"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aggregator_v3_1 = require("../../typechain/aggregator-v3");
const ethers_1 = require("ethers");
class DataFeed {
    constructor(provider, address) {
        this.contract = new ethers_1.ethers.Contract(address, aggregator_v3_1.AggregatorV3Interface__factory.abi, provider);
    }
    async getPrice() {
        const [, price] = await this.contract.latestRoundData();
        return price;
    }
}
exports.default = DataFeed;
