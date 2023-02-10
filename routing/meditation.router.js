import { Router } from "express";
import withAuth from "../middleware/auth.middleware.js";
import meditationController from "../controller/meditation.controller.js";

const router = new Router();

router.get(
  "/meditations/:id",
  withAuth(true),
  meditationController.get.bind(meditationController)
);
router.post(
  "/meditations",
  withAuth(true),
  meditationController.create.bind(meditationController)
);
router.put(
  "/meditations",
  withAuth(true),
  meditationController.update.bind(meditationController)
);
router.delete(
  "/meditations/:id",
  withAuth(true),
  meditationController.delete.bind(meditationController)
);

export default router;
