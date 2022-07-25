import { Request, Response } from "express";
import { Context, ListWalletsResponse, LoginWalletResponse } from "../type";

export const walletsHandler = (ctx: Context) => {
  return async (req: Request, res: Response) => {
    const {} = req.params;

    try {
      const wallets = await ctx.db.listWallets();

      const response: ListWalletsResponse = {
        meta: {
          count: wallets.length,
        },
      };

      res.json(response);
    } catch (err: any) {
      const response: ListWalletsResponse = {
        error: err.message,
      };

      res.json(response);
    }
  };
};

export const loginHandler = (ctx: Context) => {
  return async (req: Request, res: Response) => {
    const { wallet: walletAddr } = req.params;

    try {
      const wallet = await ctx.db.login(walletAddr);

      const response: LoginWalletResponse = {
        data: {
          wallet,
        },
      };

      res.json(response);
    } catch (err: any) {
      const response: LoginWalletResponse = {
        error: err.message,
      };

      res.json(response);
    }
  };
};
