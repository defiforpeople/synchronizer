import { environment, ERROR_MSG_INVALID_ENV } from "./type";

// load env values
import dotenv from "dotenv";
dotenv.config();

export const EnvParser = (): environment => {
  const env = {
    str: {},
    num: {},
  } as environment;

  // validate env values
  const { NODE_ENV } = process.env;
  if (!NODE_ENV || NODE_ENV === "") {
    throw new Error(`${ERROR_MSG_INVALID_ENV}, env=${NODE_ENV}`);
  }
  env.str.NODE_ENV = NODE_ENV;

  const { PORT } = process.env;
  if (!PORT || PORT === "" || Number(PORT) === NaN) {
    throw new Error(`${ERROR_MSG_INVALID_ENV}, env=${PORT}`);
  }
  env.num.PORT = Number(PORT);

  const { INTERVAL_SECONDS } = process.env;
  if (!INTERVAL_SECONDS || INTERVAL_SECONDS === "" || Number(PORT) === NaN) {
    throw new Error(`${ERROR_MSG_INVALID_ENV}, env=${INTERVAL_SECONDS}`);
  }
  env.num.INTERVAL_SECONDS = Number(INTERVAL_SECONDS);

  const { NETWORK } = process.env;
  if (!NETWORK || NETWORK === "") {
    throw new Error(`${ERROR_MSG_INVALID_ENV}, env=${NETWORK}`);
  }
  env.str.NETWORK = NETWORK;

  const { ALCHEMY_API_KEY } = process.env;
  if (!ALCHEMY_API_KEY || ALCHEMY_API_KEY === "") {
    throw new Error(`${ERROR_MSG_INVALID_ENV}, env=${ALCHEMY_API_KEY}`);
  }
  env.str.ALCHEMY_API_KEY = ALCHEMY_API_KEY;

  const { PRIVATE_KEY } = process.env;
  if (!PRIVATE_KEY || PRIVATE_KEY === "") {
    throw new Error(`${ERROR_MSG_INVALID_ENV}, env=${PRIVATE_KEY}`);
  }
  env.str.PRIVATE_KEY = PRIVATE_KEY;

  const { DATABASE_URL } = process.env;
  if (!DATABASE_URL || DATABASE_URL === "") {
    throw new Error(`${ERROR_MSG_INVALID_ENV}, env=${DATABASE_URL}`);
  }
  env.str.DATABASE_URL = DATABASE_URL;

  const { CONTRACT_ADDRESS } = process.env;
  if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS === "") {
    throw new Error(`${ERROR_MSG_INVALID_ENV}, env=${CONTRACT_ADDRESS}`);
  }
  env.str.CONTRACT_ADDRESS = CONTRACT_ADDRESS;

  return env;
};
