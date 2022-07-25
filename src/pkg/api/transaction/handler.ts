import { Request, Response } from "express";
import { Context, DepositsResponse, WithdrawResponse } from "../type";

export const getDepositsHandler = (ctx: Context) => {
  return async (req: Request, res: Response) => {
    const { wallet, contractId } = req.params;

    try {
      const deposits = await ctx.db.depositsByWalletContractAddress(wallet, contractId);

      const response: DepositsResponse = {
        data: {
          deposits,
        },
      };

      res.json(response);
    } catch (err: any) {
      const response: DepositsResponse = {
        error: err.message,
      };

      res.json(response);
    }
  };
};

export const getWithdrawsHandler = (ctx: Context) => {
  return async (req: Request, res: Response) => {
    const { wallet, contractId } = req.params;

    try {
      const withdraws = await ctx.db.withdrawsByWalletContractAddress(wallet, contractId);

      const response: WithdrawResponse = {
        data: {
          withdraws,
        },
      };

      res.json(response);
    } catch (err: any) {
      const response: WithdrawResponse = {
        error: err.message,
      };

      res.json(response);
    }
  };
};
