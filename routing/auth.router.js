import { Router } from "express";
import authController from "../controller/auth.controller.js";
import { withRequired } from "../middleware/required.middleware.js";
import { withUserExists, withValidPassword } from "../middleware/login.middleware.js";
import {
  withEncryptedPassword,
  withRequiredLength,
  withUniqLogin
} from "../middleware/register.middleware.js";

const router = new Router();

router.post(
  "/register",
  [
    withRequired(["login", "password", "gender"]),
    withRequiredLength(["login", "password"]),
    withUniqLogin,
    withEncryptedPassword
  ],
  authController.register.bind(authController)
);

router.post(
  "/login",
  [
    withRequired(["login", "password"]), //
    withUserExists,
    withValidPassword
  ],
  authController.login.bind(authController)
);

export default router;
