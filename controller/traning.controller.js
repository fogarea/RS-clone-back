import DB_Provider from "../model/provider.js";
import Traning from "../model/schema/traning.js";
import { CRUDController } from "./CRUD.controller.js";

class TraningController extends CRUDController {
  constructor() {
    super(Traning, "tranings");
  }

  async create(req, res) {
    await super.clear(req, res, "raw");

    const tranings = [];
    for (const traning of req.body) {
      const data = { body: traning };
      const createdTraning = await super.create(data, res, "raw");
      const cleanTraning = DB_Provider.normalize(createdTraning);
      tranings.push(cleanTraning);
    }

    return res.json(tranings);
  }
}

export default new TraningController();
