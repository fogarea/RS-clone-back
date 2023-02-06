import DB_Provider from "../model/provider.js";
import Program from "../model/schema/program.js";
import { CRUDController } from "./CRUD.controller.js";

class ProgramController extends CRUDController {
  constructor() {
    super(Program, "programs");
  }

  async create(req, res) {
    await super.clear(req, res, "raw");

    const programs = [];
    for (const program of req.body) {
      const data = { body: program };
      const createdProgram = await super.create(data, res, "raw");
      const cleanProgram = DB_Provider.normalize(createdProgram);
      programs.push(cleanProgram);
    }

    return res.json(programs);
  }
}

export default new ProgramController();
