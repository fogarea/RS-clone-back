import DB_Provider from "../model/provider.js";
import Training from "../model/schema/training.js";
import { CRUDController } from "./CRUD.controller.js";

class TrainingController extends CRUDController {
  constructor() {
    super(Training, "trainings");
  }

  async get(req, res) {
    const tranings = await super.get(req, res, "raw");
    const cleanTrainings = DB_Provider.normalizeAll(tranings);
    const translatedTrainings = DB_Provider.applyLanguage(
      cleanTrainings,
      req.headers.lang
    );
    return res.json(translatedTrainings);
  }

  async create(req, res) {
    await super.clear(req, res, "raw");

    const trainings = [];
    for (const training of req.body) {
      const data = { body: training };
      const createdTraining = await super.create(data, res, "raw");
      const cleanTraining = DB_Provider.normalize(createdTraining);
      trainings.push(cleanTraining);
    }

    return res.json(trainings);
  }

  async update(req, res) {
    for (const training of req.body) {
      const data = { body: training };
      await super.update(data, res, "raw");
    }

    return res.json(null);
  }
}

export default new TrainingController();
