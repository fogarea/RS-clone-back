import { body } from "express-validator";

const withValidateRequired = body(["login", "password"]).custom(
  (value, data) => {
    if (!value) {
      return Promise.reject({
        status: 400,
        message: `'${data.path}' IS REQUIRED`,
        error: `Registration error: field '${data.path}' is required`
      });
    }
    return true;
  }
);

export default [withValidateRequired];
