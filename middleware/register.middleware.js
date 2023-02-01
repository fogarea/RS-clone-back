import User from "../model/schema/user.js";
import DB_Provider from "../model/provider.js";

export const withRequiredLength = function (fields) {
  return (req, res, next) => {
    if (req.method === "OPTIONS") next();

    for (const field of fields) {
      const value = req.body[field];

      switch (field) {
        case "login":
          if (value.length < 3)
            return res.status(411).json({
              message: `USER CREATION FAILED`,
              error: `login must be at least 3 symbols`
            });

        case "password":
          if (value.length < 3 || value.length > 15)
            return res.status(411).json({
              message: `USER CREATION FAILED`,
              error: `password must be in between 3 and 15 symbols`
            });
      }
    }

    next();
  };
};

export const withUniqLogin = async (req, res, next) => {
  if (req.method === "OPTIONS") next();

  const login = req.body.login;
  const user = await DB_Provider.findOne(User, { login });

  if (user) {
    return res.status(409).json({
      message: `USER CREATION FAILED`,
      error: `User with login '${login}' already exists`
    });
  }

  next();
};
