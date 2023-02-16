import { Router } from "express";
import trackController from "../controller/track.controller.js";

const router = new Router();

router.get("/tracks", trackController.get.bind(trackController));
router.put("/tracks", trackController.update.bind(trackController));
router.post("/tracks", trackController.create.bind(trackController));

export default router;
