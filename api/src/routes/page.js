import express from "express";
import * as pageController from "#controllers/page";

const router = express.Router();

router.get("/", pageController.getAll);
router.post("/", pageController.create);
router.post("/:id", pageController.addSection);
router.patch("/:id", pageController.update);
router.delete("/:id", pageController.remove);

export default router;
