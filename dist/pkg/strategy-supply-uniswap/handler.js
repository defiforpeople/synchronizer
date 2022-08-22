"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalancesHandler = exports.getWithdrawsHandler = exports.getDepositsHandler = void 0;
const ethers_1 = require("ethers");
const ethers_2 = require("ethers");
const util_1 = require("../../util");
const type_1 = require("../strategy/type");
const getDepositsHandler = (ctx) => {
    return async (req, res) => {
        // get query params
        const { wallet, contract, strategyId, network: networkName } = req.query;
        // check wallet param
        if (!wallet || !ethers_2.utils.isAddress(wallet)) {
            const response = {
                error: `invalid param wallet=${wallet}`,
            };
            return res.status(400).json(response);
        }
        // check contract param
        if (!contract || !ethers_2.utils.isAddress(contract)) {
            const response = {
                error: `invalid param contract=${contract}`,
            };
            return res.status(400).json(response);
        }
        // check strategy_id param
        if (!strategyId || Number(strategyId) === NaN) {
            const response = {
                error: `invalid param strategyId=${strategyId}`,
            };
            return res.status(400).json(response);
        }
        // check network param
        if (!networkName || !(0, util_1.isNetworkValid)(networkName)) {
            const response = {
                error: `invalid param network=${networkName}`,
            };
            return res.status(400).json(response);
        }
        // get strategy
        const strategy = ctx.strategies.find((s) => {
            return (s.strategy.network === networkName && s.strategy.contract === contract && s.strategy.id === Number(strategyId));
        });
        // check strategy
        if (!strategy) {
            const response = {
                error: `invalid to get strategy with param network=${networkName}, contract=${contract} and strategyId=${strategyId}`,
            };
            return res.status(400).json(response);
        }
        try {
            // get deposits from database
            const deposits = await strategy.listEvents(wallet, type_1.EventType.Deposit);
            // prepare and send api response
            const response = {
                data: {
                    deposits,
                },
                meta: {
                    count: deposits.length,
                },
            };
            res.json(response);
        }
        catch (err) {
            const response = {
                error: err.message,
            };
            res.json(response);
        }
    };
};
exports.getDepositsHandler = getDepositsHandler;
const getWithdrawsHandler = (ctx) => {
    return async (req, res) => {
        // get query params
        const { wallet, contract, strategyId, network: networkName } = req.query;
        // check wallet parm
        if (!wallet || !ethers_2.utils.isAddress(wallet)) {
            const response = {
                error: `invalid param wallet=${wallet}`,
            };
            return res.status(400).json(response);
        }
        // check wallet contract
        if (!contract || !ethers_2.utils.isAddress(contract)) {
            const response = {
                error: `invalid param contract=${contract}`,
            };
            return res.status(400).json(response);
        }
        // check strategy_id param
        if (!strategyId || Number(strategyId) === NaN) {
            const response = {
                error: `invalid param strategyId=${strategyId}`,
            };
            return res.status(400).json(response);
        }
        // check network param
        if (!networkName || !(0, util_1.isNetworkValid)(networkName)) {
            const response = {
                error: `invalid param network=${networkName}`,
            };
            return res.status(400).json(response);
        }
        // get strategy
        const strategy = ctx.strategies.find((s) => {
            return (s.strategy.network === networkName && s.strategy.contract === contract && s.strategy.id === Number(strategyId));
        });
        // check strategy
        if (!strategy) {
            const response = {
                error: `invalid to get strategy with param network=${networkName}, contract=${contract} and strategyId=${strategyId}`,
            };
            return res.status(400).json(response);
        }
        try {
            // get withdraws from database
            const withdraws = await strategy.listEvents(wallet, type_1.EventType.Withdraw); /// PASAR EL STRATEGY_ID
            // prepare and send api response
            const response = {
                data: {
                    withdraws,
                },
                meta: {
                    count: withdraws.length,
                },
            };
            res.json(response);
        }
        catch (err) {
            const response = {
                error: err.message,
            };
            res.json(response);
        }
    };
};
exports.getWithdrawsHandler = getWithdrawsHandler;
const getBalancesHandler = (ctx) => {
    return async (req, res) => {
        // get query params
        const { wallet, contract, strategyId, network: networkName } = req.query;
        // check wallet parm
        if (!wallet || !ethers_2.utils.isAddress(wallet)) {
            const response = {
                error: `invalid param wallet=${wallet}`,
            };
            return res.status(400).json(response);
        }
        // check wallet contract
        if (!contract || !ethers_2.utils.isAddress(contract)) {
            const response = {
                error: `invalid param contract=${contract}`,
            };
            return res.status(400).json(response);
        }
        // check strategy_id param
        if (!strategyId || Number(strategyId) === NaN) {
            const response = {
                error: `invalid param strategyId=${strategyId}`,
            };
            return res.status(400).json(response);
        }
        // check network param
        if (!networkName || !(0, util_1.isNetworkValid)(networkName)) {
            const response = {
                error: `invalid param network=${networkName}`,
            };
            return res.status(400).json(response);
        }
        // get strategy
        const strategy = ctx.strategies.find((s) => {
            return (s.strategy.network === networkName && s.strategy.contract === contract && s.strategy.id === Number(strategyId));
        });
        // check strategy
        if (!strategy) {
            const response = {
                error: `invalid to get strategy with param network=${networkName}, contract=${contract} and strategyId=${strategyId}`,
            };
            return res.status(400).json(response);
        }
        try {
            // get deposits from database
            const deposits = await strategy.listEvents(wallet, type_1.EventType.Deposit);
            const [sumDepositsToken0, sumDepositsToken1] = deposits.reduce((sum, deposit) => {
                const [token0, token1] = sum;
                const amount0 = token0.add(ethers_1.BigNumber.from(deposit.data.token0.amount));
                const amount1 = token1.add(ethers_1.BigNumber.from(deposit.data.token1.amount));
                return [amount0, amount1];
            }, [ethers_1.BigNumber.from(0), ethers_1.BigNumber.from(0)]);
            // get withdraws from database
            const withdraws = await strategy.listEvents(wallet, type_1.EventType.Withdraw);
            const [sumWithdrawsToken0, sumWithdrawsToken1] = withdraws.reduce((sum, withdraw) => {
                const [token0, token1] = sum;
                const amount0 = token0.add(ethers_1.BigNumber.from(withdraw.data.token0.amount));
                const amount1 = token1.add(ethers_1.BigNumber.from(withdraw.data.token1.amount));
                return [amount0, amount1];
            }, [ethers_1.BigNumber.from(0), ethers_1.BigNumber.from(0)]);
            // prepare and send api response
            const response = {
                data: {
                    token0: {
                        deposits: sumDepositsToken0.toString(),
                        withdraws: sumWithdrawsToken0.toString(),
                        balance: sumDepositsToken0.sub(sumWithdrawsToken0).toString(),
                    },
                    token1: {
                        deposits: sumDepositsToken1.toString(),
                        withdraws: sumWithdrawsToken1.toString(),
                        balance: sumDepositsToken1.sub(sumWithdrawsToken1).toString(),
                    },
                },
            };
            res.json(response);
        }
        catch (err) {
            const response = {
                error: err.message,
            };
            res.json(response);
        }
    };
};
exports.getBalancesHandler = getBalancesHandler;
