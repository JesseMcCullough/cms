import express from "express";
import * as pageController from "#controllers/page";

const router = express.Router();

router.patch("/:id", pageController.updateSection);

export default router;
