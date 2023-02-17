import bcrypt from "bcrypt";
import User from "../model/schema/user.js";
import DB_Provider from "../model/provider.js";

export const withUserExists = async (req, res, next) => {
  if (req.method === "OPTIONS") next();

  const email = req.body.email;

  const user = await DB_Provider.findOne(User, { email });
  if (!user) {
    return res.status(404).json({
      message: `USER NOT FOUND`,
      error: `user with email '${email}' not found`
    });
  }

  req.user = user;

  next();
};

export const withValidPassword = async (req, res, next) => {
  if (req.method === "OPTIONS") next();

  const lang = req.headers.lang || "en";

  const user = req.user;
  const password = req.body.password;

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(403).json({
      message: lang === "en" ? `AUTHORIZATION ERROR` : "ОШИБКА АВТОРИЗАЦИИ",
      error: lang === "en" ? `wrong password` : "неверный пароль",
      code: 403
    });
  }

  next();
};
