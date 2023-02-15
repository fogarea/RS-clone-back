import DB_Provider from "../model/provider.js";
import Meditation from "../model/schema/meditation.js";
import { CRUDController } from "./CRUD.controller.js";

class MeditationController extends CRUDController {
  constructor() {
    super(Meditation, "meditations");
  }

  async get(req, res) {
    const meditation = await super.getById(req, res, "raw");
    return this.clean(res, meditation);
  }

  async create(req, res) {
    req.body.owner = req.userId;
    delete req.body.id;
    delete req.body._id;

    const createdMeditation = await super.create(req, res, "raw");
    return this.clean(res, createdMeditation);
  }

  async update(req, res) {
    req.body.owner = req.userId;

    const updatedMeditation = await super.update(req, res, "raw");
    return this.clean(res, updatedMeditation);
  }

  async delete(req, res) {
    const deletedMeditation = await super.delete(req, res, "raw");
    return this.clean(res, deletedMeditation);
  }

  clean(res, meditation) {
    const cleanMeditation = DB_Provider.normalize(meditation);
    return res.json(cleanMeditation);
  }
}

export default new MeditationController();
