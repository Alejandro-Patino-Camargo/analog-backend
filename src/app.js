import { config } from "dotenv";
import express from "express";
import cors from "cors";
config({ path: "./env" });
import linkRoutes from "./api/routes/linkRoutes.js";
import getCounter from "./api/routes/counter.js";
import getLink from "./api/controllers/Links.js";

/*middleware*/
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

/*routes*/
app.use("/api/v1", linkRoutes);
app.use("/api/v1", getCounter);
console.log(getLink);

export default app;
