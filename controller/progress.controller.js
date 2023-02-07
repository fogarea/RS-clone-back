import DB_Provider from "../model/provider.js";
import Progress from "../model/schema/progress.js";
import { CRUDController } from "./CRUD.controller.js";

class ProgressController extends CRUDController {
  constructor() {
    super(Progress, "Progress");
  }

  async getById(req, res) {
    const progress = await super.getById(req, res, "raw");
    return this.clean(res, progress);
  }

  async update(req, res) {
    const progress = await super.update(req, res, "raw");
    return this.clean(res, progress);
  }

  clean(res, progress) {
    const cleanProgress = DB_Provider.normalize(progress);
    return res.json(cleanProgress);
  }
}

export default new ProgressController();
