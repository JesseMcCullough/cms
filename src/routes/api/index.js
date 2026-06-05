import express from "express";
import { getResponse } from "#controllers/api";

const router = express.Router();

router.get("/", getResponse);

export default router;
