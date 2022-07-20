export const ERROR_MSG_INVALID_ENV = "invalid env env value";

export type environment = {
  str: {
    NODE_ENV: string;
    NETWORK: string;
    ALCHEMY_API_KEY: string;
    PRIVATE_KEY: string;
    DATABASE_URL: string;
    CONTRACT_ADDRESS: string;
  };
  num: {
    PORT: number;
    INTERVAL_SECONDS: number;
  };
};
