import { config } from "dotenv";
import express from "express";
import cors from "cors";
import process from "process";
config({ path: "./env" });
const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.MP3_API_BASE_URL
        : "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

import linkRoutes from "./api/routes/linkRoutes.js";
import getCounter from "./api/routes/counter.js";

app.use("/api/v1", linkRoutes);
app.use("/api/v1", getCounter);

export default app;
