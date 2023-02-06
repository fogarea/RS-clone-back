import { Router } from "express";
import programController from "../controller/program.controller.js";

const router = new Router();

router.get("/programs", programController.get.bind(programController));
router.post("/programs", programController.create.bind(programController));

export default router;
