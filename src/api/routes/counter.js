import express from "express";
const router = express.Router();
import getCounter from "../controllers/Counter.js";

router.get("/counter", getCounter);

export default router;
