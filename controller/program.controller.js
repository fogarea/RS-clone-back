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

    const findTraningIds = [];
    for (const program of translatedPrograms) {
      for (const training of program.trainings) {
        findTraningIds.push(training);
      }
    }

    const trainings = await DB_Provider.findMany(Training, {
      _id: { $in: [...new Set(findTraningIds)] }
    });

    for (const program of translatedPrograms) {
      const realTranings = [];
      program.trainings.forEach((training) => {
        const trainingData = trainings.find(
          (realTraning) => realTraning.program == program.id && realTraning.id == training
        );
        if (trainingData) {
          const cleanTrainingData = DB_Provider.normalize(trainingData._doc);
          realTranings.push(cleanTrainingData);
        }
      });

      const translatedTrainings = DB_Provider.applyLanguage(
        realTranings,
        req.headers.lang
      );

      program.trainings = translatedTrainings;
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

  async update(req, res) {
    for (const program of req.body) {
      const data = { body: program };
      await super.update(data, res, "raw");
    }

    return res.json(null);
  }
}

export default new ProgramController();
