import jwt from "jsonwebtoken";
import { JWT } from "../config.js";

const die = (res, error) => {
  return res.status(401).json({
    message: `NOT AUTHORIZED`,
    error
  });
};

const withValidateAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const auth = req.headers.authorization;
    if (!auth) return die(res, "no authorization token found");

    const token = auth.split(" ")[1];
    if (!token) return die(res, "no authorization token found");

    try {
      const decodedToken = jwt.verify(token, JWT.SECRET);
      req.user = decodedToken;
      next();
    } catch (err) {
      return die(res, "invalid token");
    }
  } catch (e) {
    return die(res, e.message);
  }
};

export default withValidateAuth;
