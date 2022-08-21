import { Request, Response } from "express";
import { utils } from "ethers";
import { Network } from "../../synchronizer";
import { isNetworkValid } from "../../util";
import { Context, TokensResponse, NativeTokenResponse } from "./type";

export const getNativeTokenHandler = (ctx: Context) => {
  return async (req: Request, res: Response) => {
    // get params
    const { wallet } = req.params;
    const { network: networkName } = req.query;

    // check wallet parm
    if (!wallet || !utils.isAddress(wallet)) {
      const response: TokensResponse = {
        error: `invalid param wallet=${wallet}`,
      };

      return res.status(400).json(response);
    }

    // check network param
    if (!networkName || !isNetworkValid(networkName as Network)) {
      const response: TokensResponse = {
        error: `invalid param network=${networkName}`,
      };

      return res.status(400).json(response);
    }

    try {
      // get tokens from manager
      // TODO(ca): check the hardcoded contract address
      const token = await ctx.ns[networkName as Network].tm.getNativeToken(wallet);

      // prepare and send api response
      const response: NativeTokenResponse = {
        data: {
          token,
        },
      };
      res.json(response);
    } catch (err: any) {
      const response: NativeTokenResponse = {
        error: err.message,
      };

      res.json(response);
    }
  };
};

export const getTokensHandler = (ctx: Context) => {
  return async (req: Request, res: Response) => {
    // get params
    const { wallet } = req.params;
    const { network: networkName } = req.query;

    // check wallet parm
    if (!wallet || !utils.isAddress(wallet)) {
      const response: TokensResponse = {
        error: `invalid param wallet=${wallet}`,
      };

      return res.status(400).json(response);
    }

    // check network param
    if (!networkName || !isNetworkValid(networkName as Network)) {
      const response: TokensResponse = {
        error: `invalid param network=${networkName}`,
      };

      return res.status(400).json(response);
    }

    try {
      // get tokens from manager
      // TODO(ca): check the hardcoded contract address
      const tokens = await ctx.ns[networkName as Network].tm.getTokens(wallet, [
        "0x326C977E6efc84E512bB9C30f76E30c160eD06FB", // LINK
      ]);

      // prepare and send api response
      const response: TokensResponse = {
        data: {
          tokens,
        },
        meta: {
          count: tokens.length,
        },
      };
      res.json(response);
    } catch (err: any) {
      const response: TokensResponse = {
        error: err.message,
      };

      res.json(response);
    }
  };
};
