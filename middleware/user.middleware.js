import DB_Provider from "../model/provider.js";
import User from "../model/schema/user.js";

const withUser = async (req, res, next) => {
  if (req.method === "OPTIONS") next();
  if (!req.userId) next();

  const user = await DB_Provider.findOne(User, { _id: req.userId });
  req.user = user;

  next();
};

export default withUser;
