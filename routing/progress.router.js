import { Router } from "express";
import withAuth from "../middleware/auth.middleware.js";
import progressController from "../controller/progress.controller.js";

const router = new Router();

router.get(
  "/progress/:id",
  withAuth(true),
  progressController.getById.bind(progressController)
);

router.put(
  "/progress",
  withAuth(true),
  progressController.update.bind(progressController)
);

export default router;
