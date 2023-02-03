import { Router } from "express";
import exerciseController from "../controller/exercise.controller.js";

const router = new Router();

router.get("/exercises", exerciseController.get.bind(exerciseController));
router.post("/exercises", exerciseController.create.bind(exerciseController));

export default router;
