import express from "express";
import * as sectionController from "#controllers/section";

const router = express.Router();

router.post("/", sectionController.create);
router.patch("/:id", sectionController.update);
router.delete("/:id", sectionController.remove);

export default router;
