import { Router } from "express";
import authController from "../controller/auth.controller.js";
import withAuth from "../middleware/auth.middleware.js";
import { withRequired } from "../middleware/required.middleware.js";
import { withUserExists, withValidPassword } from "../middleware/login.middleware.js";
import {
  withEncryptedPassword,
  withRequiredLength,
  withUniqEmail
} from "../middleware/register.middleware.js";
import withUser from "../middleware/user.middleware.js";

const router = new Router();

router.post(
  "/register",
  [
    withRequired(["email", "password", "name", "surname", "phone"]),
    withRequiredLength(["email", "password"]),
    withUniqEmail,
    withEncryptedPassword
  ],
  authController.register.bind(authController)
);

router.post(
  "/login",
  [
    withRequired(["email", "password"]), //
    withUserExists,
    withValidPassword
  ],
  authController.login.bind(authController)
);

router.patch("/edit/:id", withAuth(true), authController.edit.bind(authController));
router.get(
  "/user",
  [withAuth(false), withUser],
  authController.user.bind(authController)
);

export default router;
