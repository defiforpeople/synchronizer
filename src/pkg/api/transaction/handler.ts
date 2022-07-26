import { BigNumber } from "ethers";
import { Request, Response } from "express";
import { BalacesResponse, Context, DepositsResponse, WithdrawsResponse } from "../type";

export const getDepositsHandler = (ctx: Context) => {
  return async (req: Request, res: Response) => {
    const { wallet, contractId } = req.params;

    try {
      const deposits = await ctx.db.depositsByWalletContractAddress(wallet, contractId);

      const response: DepositsResponse = {
        data: {
          deposits,
        },
        meta: {
          count: deposits.length,
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

      const response: WithdrawsResponse = {
        data: {
          withdraws,
        },
        meta: {
          count: withdraws.length,
        },
      };

      res.json(response);
    } catch (err: any) {
      const response: WithdrawsResponse = {
        error: err.message,
      };

      res.json(response);
    }
  };
};

export const getBalancesHandler = (ctx: Context) => {
  return async (req: Request, res: Response) => {
    const { wallet, contractId } = req.params;

    try {
      const deposits = await ctx.db.depositsByWalletContractAddress(wallet, contractId);
      const sumDeposits: BigNumber = deposits.reduce(
        (sum, deposit) => sum.add(BigNumber.from(deposit.amount)),
        BigNumber.from(0)
      );

      const withdraws = await ctx.db.withdrawsByWalletContractAddress(wallet, contractId);
      const sumWithdraws: BigNumber = withdraws.reduce(
        (sum, withdraw) => sum.add(BigNumber.from(withdraw.amount)),
        BigNumber.from(0)
      );

      const diff = sumDeposits.sub(sumWithdraws);

      const response: BalacesResponse = {
        data: {
          deposits: sumDeposits.toString(),
          withdraws: sumWithdraws.toString(),
          balance: diff.toString(),
        },
      };

      res.json(response);
    } catch (err: any) {
      const response: BalacesResponse = {
        error: err.message,
      };

      res.json(response);
    }
  };
};
