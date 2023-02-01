import jwt from "jsonwebtoken";
import { JWT } from "./../config.js";
import User from "../model/schema/user.js";
import DB_Provider from "../model/provider.js";

class AuthController {
  async register(req, res) {
    try {
      const createdUser = await DB_Provider.create(User, req.body);
      return res.json(createdUser);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: `USER CREATION FAILED`,
        error: e.message
      });
    }
  }

  async login(req, res) {
    const payload = {
      id: req.user._id,
      login: req.user.login
    };

    const token = jwt.sign(payload, JWT.SECRET, {
      expiresIn: "1h"
    });

    return res.json({ token });
  }
}

export default new AuthController();
