import { Router } from "express";
import postController from "../controller/post.controller.js";

const router = new Router();

router.get("/posts", postController.get.bind(postController));
router.get("/posts/:id", postController.getById.bind(postController));
router.post("/posts", postController.create.bind(postController));
router.put("/posts", postController.update.bind(postController));
router.delete("/posts/:id", postController.delete.bind(postController));

export default router;
