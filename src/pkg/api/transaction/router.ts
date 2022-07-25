import { Router } from "express";
import { Context } from "../type";
import { getDepositsHandler, getWithdrawsHandler } from "./handler";

export const router = (ctx: Context) => {
  const router = Router();

  router.get("/transactions/:wallet/deposits/:contract_id", getDepositsHandler(ctx));
  router.get("/transactions/:wallet/withdraws/:contract_id", getWithdrawsHandler(ctx));

  return router;
};
