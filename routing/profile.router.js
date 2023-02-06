import { Router } from "express";
import profileController from "../controller/profile.controller.js";

const router = new Router();

router.get("/profile/:id", profileController.getById.bind(profileController));
router.put("/profile", profileController.update.bind(profileController));

export default router;
