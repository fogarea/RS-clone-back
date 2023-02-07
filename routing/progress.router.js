import { Router } from "express";
import progressController from "../controller/progress.controller.js";

const router = new Router();

router.get("/progress/:id", progressController.getById.bind(progressController));
router.put("/progress", progressController.update.bind(progressController));

export default router;
