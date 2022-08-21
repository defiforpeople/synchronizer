import { Context, StrategiesResponse, StrategiesByNetworkResponse, StrategyType } from "./type";
import { Request, Response } from "express";

export const getStrategies = (ctx: Context) => {
  return async (req: Request, res: Response) => {
    const strategies: any[] = [];
    strategies.push(...ctx.strategies.supplyUniswap.map((s) => s.strategy));
    strategies.push(...ctx.strategies.supplyAave.map((s) => s.strategy));

    const response: StrategiesResponse = {
      data: {
        strategies,
      },
    };

    res.json(response);
  };
};

export const getStrategiesByNetworks = (ctx: Context) => {
  return async (req: Request, res: Response) => {
    const networks: { [key: string]: any[] } = {};

    // define callback to use on forEach
    const cb = (s: any) => {
      const info = s.strategy;

      if (!networks[info.network]) {
        networks[info.network] = [];
      }

      networks[info.network].push(info);
    };

    // parse strategies
    ctx.strategies.supplyUniswap.forEach(cb);
    ctx.strategies.supplyAave.forEach(cb);

    const response: StrategiesByNetworkResponse = {
      data: {
        strategies: networks,
      },
    };

    res.json(response);
  };
};
