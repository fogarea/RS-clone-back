import { Router } from "express";
import mealController from "../controller/meal.controller.js";

const router = new Router();

router.get("/meals", mealController.get.bind(mealController));
router.put("/meals", mealController.update.bind(mealController));
router.post("/meals", mealController.create.bind(mealController));

export default router;
