import jwt from "jsonwebtoken";
import { JWT } from "./../config.js";
import User from "../model/schema/user.js";
import Profile from "../model/schema/profile.js";
import DB_Provider from "../model/provider.js";

class AuthController {
  async register(req, res) {
    try {
      const createdProfile = await DB_Provider.create(Profile, {}, "withReturn");

      req.body.profile = createdProfile._id;
      const createdUser = await DB_Provider.create(User, req.body, "withReturn");

      const user = DB_Provider.normalize(createdUser);
      return res.json(user);
    } catch (e) {
      return res.status(500).json({
        message: `USER CREATION FAILED`,
        error: e.message
      });
    }
  }

  async login(req, res) {
    const payload = {
      ...req.user,
      id: req.user._id
    };
    delete payload._id;

    const accessToken = jwt.sign(payload, JWT.SECRET.ACCESS, {
      expiresIn: JWT.LIFE.ACCESS
    });

    const refreshToken = jwt.sign(payload, JWT.SECRET.REFRESH, {
      expiresIn: JWT.LIFE.REFRESH
    });

    req.user = DB_Provider.normalize(req.user);

    return res
      .cookie("X-Refresh-Token", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 365 * 24 * 60 * 60 * 1000
      })
      .header("X-Access-Token", accessToken)
      .status(200)
      .json(req.user);
  }

  async user(req, res) {
    const user = req.user ? req.user : null;
    res.status(200).json(user);
  }
}

export default new AuthController();
