import jwt from "jsonwebtoken";
import { JWT } from "../config.js";
import { isJwtExpired } from "jwt-check-expiration";

const die = (res, error) => {
  return res.status(401).json({
    message: `NOT AUTHORIZED`,
    error
  });
};

const renewToken = (req) => {
  const refreshToken = req.cookies["X-Refresh-Token"];
  try {
    const decodedRefresh = jwt.verify(refreshToken, JWT.SECRET.REFRESH);
    const payload = {
      id: decodedRefresh.id,
      login: decodedRefresh.login
    };
    return jwt.sign(payload, JWT.SECRET.ACCESS, {
      expiresIn: JWT.LIFE.ACCESS
    });
  } catch (e) {
    return die(res, e.message);
  }
};

const withAuth = (req, res, next) => {
  if (req.method === "OPTIONS") next();

  try {
    const auth = req.headers.authorization;
    if (!auth) return die(res, "no authorization token found");

    let accessToken = auth.split(" ")[1];
    if (!accessToken) return die(res, "no authorization token found");

    try {
      if (isJwtExpired(accessToken)) accessToken = renewToken(req);
      const decodedAccess = jwt.verify(accessToken, JWT.SECRET.ACCESS);
      req.user = decodedAccess;
      res.set("X-Access-Token", accessToken);
      next();
    } catch (err) {
      return die(res, "invalid token");
    }
  } catch (e) {
    return die(res, e.message);
  }
};

export default withAuth;
