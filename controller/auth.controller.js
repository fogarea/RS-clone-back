import bcrypt from "bcrypt";
import User from "../model/schema/user.js";
import DB_Provider from "../model/provider.js";
import { validationResult } from "express-validator";

class AuthController {
  async register(req, res) {
    try {
      const validation = validationResult(req);

      if (validation.errors.length) {
        const { status, message, error } = validation.errors[0].msg;
        return res.status(status).json({ message, error });
      }

      const createdUser = await DB_Provider.create(
        User,
        await this.encryptPassword(req.body)
      );
      res.json(createdUser);
    } catch (e) {
      res.status(500).json({
        message: `USER CREATION FAILED`,
        error: e.message
      });
    }
  }

  async logout(req, res) {}

  async login(req, res) {}

  async encryptPassword(body) {
    body.password = await this.hashPassword(body.password);
    return body;
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
}

export default new AuthController();
