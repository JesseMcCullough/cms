import express from "express";
import { createPage } from "#controllers/page";

const router = express.Router();

router.post("/", createPage);

// router.post('/pages', createPage);
// router.get('/pages', getPages);
// router.get('/pages/:id', getPage);
// router.put('/pages/:id', updatePage);
// router.delete('/pages/:id', deletePage);

export default router;
