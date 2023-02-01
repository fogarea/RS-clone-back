import bcrypt from "bcrypt";
import User from "../model/schema/user.js";
import DB_Provider from "../model/provider.js";

export const withUserExists = async (req, res, next) => {
  if (req.method === "OPTIONS") next();

  const login = req.body.login;

  const user = await DB_Provider.findOne(User, { login });
  if (!user) {
    return res.status(404).json({
      message: `USER NOT FOUND`,
      error: `user with login '${login}' not found`
    });
  }

  req.user = user;

  next();
};

export const withValidPassword = async (req, res, next) => {
  if (req.method === "OPTIONS") next();

  const user = req.user;
  const password = req.body.password;

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(403).json({
      message: `USER NOT FOUND`,
      error: `wrong password`
    });
  }

  next();
};
