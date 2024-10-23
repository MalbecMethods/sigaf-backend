import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "./src/config/config.js";
import userRouter from "./src/routes/user.routes.js";
import { dbConnection } from "./src/db/connectionDB.js";
import iaRouter from "./src/routes/ia.routes.js";
import lensRouter from "./src/routes/lens.routes.js";
import todoRouter from "./src/routes/todo.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = PORT;

    this.dbConnection();

    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use("/api", userRouter);
    this.app.use("/api", iaRouter);
    this.app.use("/api", lensRouter);
    this.app.use("/api", todoRouter);
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log("Servidor corriendo en http://localhost:" + this.port),
    );
  }
}

const server = new Server();

server.listen();
