import { Router } from "express";
import authController from "../controller/auth.controller.js";
import registerValidation from "../middleware/register.middleware.js";
import loginValidation from "../middleware/login.middleware.js";

const router = new Router();

router.post(
  "/register",
  [registerValidation],
  authController.register.bind(authController)
);

router.post(
  "/login",
  [loginValidation],
  authController.login.bind(authController)
);

export default router;
