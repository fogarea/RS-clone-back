import { Router } from "express";
import withAuth from "../middleware/auth.middleware.js";
import profileController from "../controller/profile.controller.js";

const router = new Router();

router.get(
  "/profile/:id",
  withAuth(true),
  profileController.getById.bind(profileController)
);

router.put(
  "/profile", //
  withAuth(true),
  profileController.update.bind(profileController)
);

export default router;
