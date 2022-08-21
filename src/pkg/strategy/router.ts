import { Router as RouterExpress } from "express";
import { Context } from "./type";
import { getStrategies, getStrategiesByNetworks } from "./handler";

export const Router = (ctx: Context) => {
  const router = RouterExpress();

  router.get("/strategies", getStrategies(ctx));
  router.get("/strategies-by-networks", getStrategiesByNetworks(ctx));

  return router;
};
