import DB_Provider from "../model/provider.js";
import Profile from "../model/schema/profile.js";
import { CRUDController } from "./CRUD.controller.js";

class ProfileController extends CRUDController {
  constructor() {
    super(Profile, "profile");
  }

  async update(req, res) {
    const profile = await super.update(req, res, "raw");
    const cleanProfile = DB_Provider.normalize(profile);
    return res.json(cleanProfile);
  }
}

export default new ProfileController();
