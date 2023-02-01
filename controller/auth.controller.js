import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT } from "./../config.js";
import User from "../model/schema/user.js";
import DB_Provider from "../model/provider.js";
import { validationResult } from "express-validator";

class AuthController {
  async register(req, res) {
    try {
      const validation = validationResult(req);
      if (validation.errors.length) return this.die(res, validation);

      const createdUser = await DB_Provider.create(
        User,
        await this.encryptPassword(req.body)
      );
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
    const validation = validationResult(req);
    if (validation.errors.length) return this.die(res, validation);

    const { login, password } = req.body;

    const user = await DB_Provider.findOne(User, { login });
    if (!user) {
      return res.status(404).json({
        message: `USER NOT FOUND`,
        error: `user with login '${login}' not found`
      });
    }

    const validPassword = await this.comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(403).json({
        message: `USER NOT FOUND`,
        error: `wrong password`
      });
    }

    const token = this.generateToken(user);
    return res.json({ token });
  }

  generateToken(user) {
    const payload = {
      id: user._id
    };

    return jwt.sign(payload, JWT.SECRET, { expiresIn: "1h" });
  }

  die(res, validation) {
    const { status, message, error } = validation.errors[0].msg;
    return res.status(status).json({ message, error });
  }

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
