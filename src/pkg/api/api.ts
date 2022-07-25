// load dependencies
import http from "http";
import express from "express";
import { IDatabase } from "../database/type";

// load routers
import * as wallet from "./wallet";
import * as transaction from "./transaction";

export class Server {
  private port: number;
  private db: IDatabase;
  private server: http.Server;

  constructor(port: number, db: IDatabase) {
    this.port = port;
    this.db = db;
  }

  public run(): void {
    const app = express();

    app.use("/api/v1", transaction.router({ db: this.db }));
    app.use("/api/v1", wallet.router({ db: this.db }));

    this.server = app.listen(this.port, async () => {
      console.log(`server are listening on port ${this.port}`);
    });
  }

  public stop(): void {
    this.server.close();
  }
}
