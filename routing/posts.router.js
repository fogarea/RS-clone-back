import { Router } from "express";
import postController from "../controller/post.controller.js";
import authValidation from "../middleware/auth.middleware.js";

const router = new Router();

router.get("/posts", postController.get.bind(postController));
router.get("/posts/:id", postController.getById.bind(postController));

router.post(
  "/posts",
  authValidation,
  postController.create.bind(postController)
);

router.put(
  "/posts",
  authValidation,
  postController.update.bind(postController)
);

router.delete(
  "/posts/:id",
  authValidation,
  postController.delete.bind(postController)
);

export default router;
