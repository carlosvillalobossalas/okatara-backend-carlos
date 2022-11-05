import express, { Application, json } from "express";
import cors from "cors";
import packagesRouter from "../routes/packages";
import { dbConnection } from "../database/config";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    packages: "/api/packages",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";

    dbConnection();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //BODY
    this.app.use(json());
    //PUBLIC
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.packages, packagesRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port: " + this.port);
    });
  }
}

export default Server;
