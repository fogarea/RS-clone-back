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
      email: decodedRefresh.email,
      name: decodedRefresh.name,
      surname: decodedRefresh.surname
    };
    return jwt.sign(payload, JWT.SECRET.ACCESS, {
      expiresIn: JWT.LIFE.ACCESS
    });
  } catch (e) {
    return die(res, e.message);
  }
};

const withAuth = function (withDie = false) {
  return (req, res, next) => {
    if (req.method === "OPTIONS") next();

    try {
      const auth = req.headers.authorization;
      if (!auth) {
        if (withDie) return die(res, "no authorization token found");
        else next();
      }

      let accessToken = auth ? auth.split(" ")[1] : null;
      if (!accessToken) {
        if (withDie) return die(res, "no authorization token found");
        else next();
      }

      try {
        let refresh = false;
        if (isJwtExpired(accessToken)) {
          accessToken = renewToken(req);
          refresh = true;
        }
        const decodedAccess = jwt.verify(accessToken, JWT.SECRET.ACCESS);
        req.user = decodedAccess;
        if (refresh) res.set("X-Access-Token", accessToken);
        next();
      } catch (err) {
        if (withDie) return die(res, "invalid token");
        else next();
      }
    } catch (e) {
      if (withDie) return die(res, e.message);
      else next();
    }
  };
};

export default withAuth;
