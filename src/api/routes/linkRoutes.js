import express from "express";
const router = express.Router();
import fetchMP3 from "../controllers/Links.js";

router.get("/fetchMP3", fetchMP3);

export default router;
