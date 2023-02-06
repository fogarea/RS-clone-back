import DB_Provider from "../model/provider.js";
import Program from "../model/schema/program.js";
import { CRUDController } from "./CRUD.controller.js";

class ProgramController extends CRUDController {
  constructor() {
    super(Program, "programs");
  }

  async get(req, res) {
    const programs = await super.get(req, res, "raw");
    const cleanPrograms = DB_Provider.normalizeAll(programs);
    const translatedPrograms = DB_Provider.applyLanguage(cleanPrograms, req.headers.lang);
    return res.json(translatedPrograms);
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
