"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Strategy = void 0;
const type_1 = require("../strategy/type");
const cron_1 = require("./cron");
class Strategy {
    constructor(strategy, storage, intervalMs, contract) {
        this._strategy = strategy;
        this._storage = storage;
        this._cron = new cron_1.Cron(strategy, intervalMs, contract, this._storage);
    }
    get strategy() {
        return this._strategy;
    }
    get network() {
        return this._strategy.network;
    }
    get contract() {
        return this._strategy.contract;
    }
    async init() {
        // get latest deposit/withdraw events from db
        const latestDeposit = await this._storage.getLastEventByType(this._strategy.id, type_1.EventType.Deposit);
        const latestWithdraw = await this._storage.getLastEventByType(this._strategy.id, type_1.EventType.Withdraw);
        await this._cron.init(latestDeposit, latestWithdraw);
    }
    async close() {
        await this._storage.close();
        await this._cron.close();
    }
    async insertEvents(tt) {
        return this._storage.insertEvents(tt);
    }
    async listEvents(wallet, type) {
        return this._storage.listEvents(this._strategy.id, wallet, type);
    }
    async listEventsByHashes(hashes) {
        return this._storage.listEventsByHashes(this._strategy.id, hashes);
    }
    async getLastEventByType(type) {
        return this._storage.getLastEventByType(this._strategy.id, type);
    }
}
exports.Strategy = Strategy;
