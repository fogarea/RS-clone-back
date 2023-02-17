import bcrypt from "bcrypt";
import User from "../model/schema/user.js";
import DB_Provider from "../model/provider.js";

export const withUniqEmail = async (req, res, next) => {
  if (req.method === "OPTIONS") next();

  const lang = req?.headers?.lang || "en";

  const email = req.body.email;
  const user = await DB_Provider.findOne(User, { email });

  if (user) {
    return res.status(409).json({
      message: lang === "en" ? "REGISTRATION ERROR" : "ОШИБКА РЕГИСТРАЦИИ",
      error:
        lang === "en"
          ? `User with email '${email}' already exists`
          : `Пользователь с email '${email}' уже существует`,
      code: 409
    });
  }

  next();
};

export const withEncryptedPassword = async (req, res, next) => {
  if (req.method === "OPTIONS") next();

  req.body.password = await bcrypt.hash(req.body.password, 10);

  next();
};
