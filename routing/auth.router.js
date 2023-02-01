import { Router } from "express";
import authController from "../controller/auth.controller.js";
import { withRequired } from "../middleware/required.middleware.js";
import {
  withRequiredLength,
  withUniqLogin
} from "../middleware/register.middleware.js";

const router = new Router();

router.post(
  "/register",
  [
    withRequired(["login", "password", "sex"]),
    withRequiredLength(["login", "password"]),
    withUniqLogin
  ],
  authController.register.bind(authController)
);

router.post(
  "/login",
  withRequired(["login", "password"]),
  authController.login.bind(authController)
);

export default router;
