import { StrategyType } from "../strategy/type";
import { ISupplyAaveStorage } from "./interface";
import { SupplyAaveStrategy } from "./type";

export const Seed = async (storage: ISupplyAaveStorage) => {
  const strategies: SupplyAaveStrategy[] = [
    {
      name: "Supply Aave WMATIC",
      type: "supply-aave",
      contract: "0x125dF0B4Ab64Bf6AeD9Fdac6FbaBc4Cf441614B7",
      network: "maticmum",
      data: {
        token: {
          symbol: "WMATIC",
          address: "0xb685400156cF3CBE8725958DeAA61436727A30c3",
        },
      },
      // user_wallet: 0x57ac4E23aE911Cb3aEDAfE9ABb8E68a68F7CC463
    },
    {
      name: "Supply Aave WMATIC",
      type: "supply-aave",
      contract: "0xe47fF9b7Ae4888492cEB892cb52ab43fcD08b2aC",
      network: "matic",
      data: {
        token: {
          symbol: "WMATIC",
          address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
        },
      },
      // user_wallet: 0xa2e50fbBE2D73cd9E2c6e2c97E8Beac17B22C957
    },
  ];

  const results: SupplyAaveStrategy[] = [];
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
