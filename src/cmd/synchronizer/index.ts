import "reflect-metadata";

// import contract dependencies
import { MockSupplyAave, MockSupplyAave__factory } from "../../typechain";

// load env values
import dotenv from "dotenv";
dotenv.config();

// import packages
import { Server } from "../../pkg/api";
import { Database } from "../../pkg/database";
import { Cron } from "../../pkg/cron";
import { EnvParser } from "../../pkg/env-parser";

// define logger
import log from "pino";
import { ethers } from "ethers";
const logger = log();

// define global instances
let api: Server;
let db: Database;
let cron: Cron;

async function main() {
  try {
    // get env values
    const env = EnvParser();

    // run database package
    db = new Database(env.str.DATABASE_URL);
    await db.connect();

    // run api package
    api = new Server(env.num.PORT, db);
    api.run();

    // initialize contract
    const provider = new ethers.providers.AlchemyProvider(env.str.NETWORK, env.str.ALCHEMY_API_KEY);
    const contract = new ethers.Contract(
      env.str.CONTRACT_ADDRESS,
      MockSupplyAave__factory.abi,
      provider
    ) as MockSupplyAave;

    // run cron package
    cron = new Cron(env.num.INTERVAL_SECONDS, db, contract);
    cron.run();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

// listen process event listeners
const signCb = async () => {
  try {
    cron.stop();
    api.stop();
    await db.close();
  } catch (err) {
    logger.error(err);
  }
};
process.on("SIGTERM", signCb);
process.on("SIGINT", signCb);

// run synchronizer
main();
