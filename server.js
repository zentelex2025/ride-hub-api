import express from "express";
import http from "http";
import cors from "cors";
import "dotenv/config";
import dns from "node:dns";
import loggers from "./src/config/logger.js";
import mongooseConnection from "./src/config/mongoose-connect.js";
import errorHandler from "./src/middleware/error-middleware.js";
import createRouter from "./src/router.js";
import cookieParser from "cookie-parser";
import rate_limiter from "./src/lib/rate-limiter.js";
import helmet from "helmet";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT ?? 7000;

// added temporary dns , because node.js dns is failing
dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  }),
);

app.use(helmet());
app.use(rate_limiter);
app.use(express.json());
app.use(cookieParser());
app.use("/api", createRouter());
app.use(errorHandler);

await mongooseConnection();

server.listen(PORT, loggers.info(`server is running on port ${PORT}`));
