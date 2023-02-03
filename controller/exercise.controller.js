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
      exercises.push(await super.create(data, res, "raw"));
    }

    return res.json(exercises);
  }
}

export default new ExerciseController();
