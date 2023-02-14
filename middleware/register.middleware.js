import bcrypt from "bcrypt";
import User from "../model/schema/user.js";
import DB_Provider from "../model/provider.js";

export const withUniqEmail = async (req, res, next) => {
  if (req.method === "OPTIONS") next();

  const email = req.body.email;
  const user = await DB_Provider.findOne(User, { email });

  if (user) {
    return res.status(409).json({
      message: `USER CREATION FAILED`,
      error: `User with email '${email}' already exists`
    });
  }

  next();
};

export const withEncryptedPassword = async (req, res, next) => {
  if (req.method === "OPTIONS") next();

  req.body.password = await bcrypt.hash(req.body.password, 10);

  next();
};
