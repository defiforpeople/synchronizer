"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seed = void 0;
const Seed = async (storage) => {
    const strategies = [
        {
            name: "Supply Aave WMATIC",
            type: "supply-aave",
            contract: "0x08f207fd97Aa730fcA8997b4833C71576B48445a",
            network: "maticmum",
            data: {
                token: {
                    symbol: "WMATIC",
                    address: "0xb685400156cF3CBE8725958DeAA61436727A30c3",
                },
            },
        },
        {
            name: "Supply Aave WMATIC",
            type: "supply-aave",
            contract: "0x2e01E2Be86675c68281bb151802e66D7D6EEF79B",
            network: "matic",
            data: {
                token: {
                    symbol: "WMATIC",
                    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
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
