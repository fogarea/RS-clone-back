import { Router } from "express";
import trainingController from "../controller/training.controller.js";

const router = new Router();

router.get("/trainings", trainingController.get.bind(trainingController));
router.post("/trainings", trainingController.create.bind(trainingController));
router.put("/trainings", trainingController.update.bind(trainingController));

export default router;
