import { Router } from "express";
import authController from "../controller/auth.controller.js";
import registerValidation from "../validation/register.validation.js";

const router = new Router();

router.post(
  "/register",
  [registerValidation],
  authController.register.bind(authController)
);
router.post("/login", authController.login.bind(authController));
router.post("/logout", authController.logout.bind(authController));

export default router;
