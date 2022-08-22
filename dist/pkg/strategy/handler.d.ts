import { Context } from "./type";
import { Request, Response } from "express";
export declare const getStrategies: (ctx: Context) => (req: Request, res: Response) => Promise<void>;
export declare const getStrategiesByNetworks: (ctx: Context) => (req: Request, res: Response) => Promise<void>;
