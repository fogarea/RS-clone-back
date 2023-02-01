import { body } from "express-validator";
import User from "../model/schema/user.js";
import DB_Provider from "../model/provider.js";

const withValidateRequired = body(["login", "password", "sex"]).custom(
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

const withValidateData = body(["login", "password"]).custom((value, data) => {
  switch (data.path) {
    case "login":
      if (value.length < 3)
        return Promise.reject({
          status: 411,
          message: `USER CREATION FAILED`,
          error: `login must be at least 3 symbols`
        });

    case "password":
      if (value.length < 3 || value.length > 15)
        return Promise.reject({
          status: 411,
          message: `USER CREATION FAILED`,
          error: `login must be in between 3 and 15 symbols`
        });
  }
  return true;
});

const withValidateUniq = body("login").custom(async (login) => {
  const user = await DB_Provider.findOne(User, { login });

  if (user) {
    return Promise.reject({
      status: 409,
      message: `USER CREATION FAILED`,
      error: `User with login '${login}' already exists`
    });
  }
  return true;
});

export default [withValidateRequired, withValidateData, withValidateUniq];
