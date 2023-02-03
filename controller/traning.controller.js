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
      tranings.push(await super.create(data, res, "raw"));
    }

    return res.json(tranings);
  }
}

export default new TraningController();
