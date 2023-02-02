import { Router } from "express";
import postController from "../controller/post.controller.js";
import withAuth from "../middleware/auth.middleware.js";

const router = new Router();

router.get("/posts", postController.get.bind(postController));
router.get("/posts/:id", postController.getById.bind(postController));
router.post("/posts", withAuth(true), postController.create.bind(postController));
router.put("/posts", withAuth(true), postController.update.bind(postController));
router.delete("/posts/:id", withAuth(true), postController.delete.bind(postController));

export default router;
