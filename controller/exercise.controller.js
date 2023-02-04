import DB_Provider from "../model/provider.js";
import Exercise from "../model/schema/exercise.js";
import { CRUDController } from "./CRUD.controller.js";

class ExerciseController extends CRUDController {
  constructor() {
    super(Exercise, "exercises");
  }

  async create(req, res) {
    await super.clear(req, res, "raw");

    const exercises = [];
    for (const exercise of req.body) {
      const data = { body: exercise };
      const createdExercise = await super.create(data, res, "raw");
      const cleanExercise = DB_Provider.normalize(createdExercise);
      exercises.push(cleanExercise);
    }

    return res.json(exercises);
  }
}

export default new ExerciseController();
