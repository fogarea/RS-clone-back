import { Router } from "express";
import meditationController from "../controller/meditation.controller.js";

const router = new Router();

router.get("/meditations/:id", meditationController.get.bind(meditationController));
router.post("/meditations", meditationController.create.bind(meditationController));
router.put("/meditations", meditationController.update.bind(meditationController));
router.delete("/meditations/:id", meditationController.delete.bind(meditationController));

export default router;
