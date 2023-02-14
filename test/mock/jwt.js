import jwt from "jsonwebtoken";
import { JWT } from "../../config.js";

export default (id) => {
  return jwt.sign({ id }, JWT.SECRET.ACCESS, {
    expiresIn: JWT.LIFE.ACCESS
  });
};
