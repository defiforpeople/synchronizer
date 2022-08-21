import { Router as RouterExpress } from "express";
import { Context } from "./type";
import { getTokensHandler } from "./handler";

export const Router = (ctx: Context) => {
  const router = RouterExpress();

  router.get("/tokens/:wallet", getTokensHandler(ctx));

  return router;
};
