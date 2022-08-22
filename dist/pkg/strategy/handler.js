"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStrategiesByNetworks = exports.getStrategies = void 0;
const getStrategies = (ctx) => {
    return async (req, res) => {
        const strategies = [];
        strategies.push(...ctx.strategies.supplyUniswap.map((s) => s.strategy));
        strategies.push(...ctx.strategies.supplyAave.map((s) => s.strategy));
        const response = {
            data: {
                strategies,
            },
        };
        res.json(response);
    };
};
exports.getStrategies = getStrategies;
const getStrategiesByNetworks = (ctx) => {
    return async (req, res) => {
        const networks = {};
        // define callback to use on forEach
        const cb = (s) => {
            const info = s.strategy;
            if (!networks[info.network]) {
                networks[info.network] = [];
            }
            networks[info.network].push(info);
        };
        // parse strategies
        ctx.strategies.supplyUniswap.forEach(cb);
        ctx.strategies.supplyAave.forEach(cb);
        const response = {
            data: {
                strategies: networks,
            },
        };
        res.json(response);
    };
};
exports.getStrategiesByNetworks = getStrategiesByNetworks;
