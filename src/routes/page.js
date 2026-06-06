import express from "express";
import * as pageController from "#controllers/page";

const router = express.Router();

router.post("/", pageController.create);
router.patch("/:id", pageController.update);

// router.post('/pages', createPage);
// router.get('/pages', getPages);
// router.get('/pages/:id', getPage);
// router.put('/pages/:id', updatePage);
// router.delete('/pages/:id', deletePage);

export default router;
