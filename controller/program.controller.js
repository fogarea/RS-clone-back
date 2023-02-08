import DB_Provider from "../model/provider.js";
import Program from "../model/schema/program.js";
import Training from "../model/schema/training.js";
import { CRUDController } from "./CRUD.controller.js";

class ProgramController extends CRUDController {
  constructor() {
    super(Program, "programs");
  }

  async get(req, res) {
    const programs = await super.get(req, res, "raw");
    const cleanPrograms = DB_Provider.normalizeAll(programs);
    const translatedPrograms = DB_Provider.applyLanguage(cleanPrograms, req.headers.lang);

    for (const program of translatedPrograms) {
      const realTranings = [];
      for (const training of program.trainings) {
        const trainingData = await DB_Provider.findById(Training, training);
        const cleanTrainingData = DB_Provider.normalize(trainingData);
        realTranings.push(cleanTrainingData);
      }
      program.trainings = realTranings;
    }

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
