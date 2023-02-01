import { Router } from "express";
import authController from "../controller/auth.controller.js";
import registerValidation from "../validation/register.validation.js";
import loginValidation from "../validation/login.validation.js";

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
