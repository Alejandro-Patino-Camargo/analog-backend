import { config } from "dotenv";
import express from "express";
import cors from "cors";
import process from "process";

config({ path: "./env" });

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: "https://analog-front.vercel.app/",
      credentials: true,
    }),
  );
} else {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );
}

app.use(express.json());

import linkRoutes from "./api/routes/linkRoutes.js";
import getCounter from "./api/routes/counter.js";

app.use("/api/v1", linkRoutes);
app.use("/api/v1", getCounter);

export default app;
