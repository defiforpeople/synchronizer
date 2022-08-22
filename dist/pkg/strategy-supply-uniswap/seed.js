"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seed = void 0;
const Seed = async (storage) => {
    const strategies = [
        {
            name: "Supply Uniswap WMATIC/WETH",
            network: "maticmum",
            type: "supply-uniswap",
            contract: "0x46F3a695Ed91ccDD4CB55Cc86Db18518218e3399",
            data: {
                poolId: "0",
                poolFee: "100",
                token0: {
                    symbol: "WMATIC",
                    address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
                },
                token1: {
                    symbol: "WETH",
                    address: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0",
                },
            },
        },
        {
            name: "Supply Uniswap WMATIC/WETH",
            type: "supply-uniswap",
            network: "matic",
            contract: "0xC9Fc250Ab92a802fCc96719eBE17c9c831aDF264",
            data: {
                poolId: "1",
                poolFee: "100",
                token0: {
                    symbol: "WMATIC",
                    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
                },
                token1: {
                    symbol: "WETH",
                    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
                },
            },
        },
    ];
    const results = [];
    for (let i = 0; i < strategies.length; i++) {
        const strategy = strategies[i];
        // get current strategy, if exists continue on loop
        const find = await storage.getStrategy(strategy);
        if (find) {
            continue;
        }
        // create strategy
        const createdStrategy = await storage.createStrategy(strategy);
        results.push(createdStrategy);
    }
    return results;
};
exports.Seed = Seed;
