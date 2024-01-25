import { config } from "dotenv";
import express from "express";
import cors from "cors";
config({ path: "./env" });
import linkRoutes from "./api/routes/linkRoutes.js";
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

app.use('/api/v1', linkRoutes);
console.log(getLink)


/*routes*/

export default app;
