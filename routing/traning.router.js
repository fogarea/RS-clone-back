import { Router } from "express";
import traningController from "../controller/traning.controller.js";

const router = new Router();

router.get("/tranings", traningController.get.bind(traningController));
router.post("/tranings", traningController.create.bind(traningController));

export default router;
