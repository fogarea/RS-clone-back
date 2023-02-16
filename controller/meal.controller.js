import DB_Provider from "../model/provider.js";
import Meal from "../model/schema/meal.js";
import { CRUDController } from "./CRUD.controller.js";

class MealController extends CRUDController {
  constructor() {
    super(Meal, "meals");
  }

  async get(req, res) {
    const meals = await super.get(req, res, "raw");
    const cleanMeals = DB_Provider.normalizeAll(meals);
    const translatedMeals = DB_Provider.applyLanguage(cleanMeals, req.headers.lang);

    for (const meal of translatedMeals) {
      meal.ingredients = DB_Provider.applyLanguage(meal.ingredients, req.headers.lang);
    }

    const groupedMeals = this.groupBy("type", translatedMeals);

    return res.json(groupedMeals);
  }

  groupBy(group, meals) {
    const groupedMeals = {};

    meals.forEach((meal) => {
      const groupType = meal[group];

      groupedMeals[groupType] ??= [];
      groupedMeals[groupType].push(meal);
    });

    return groupedMeals;
  }

  async create(req, res) {
    await super.clear(req, res, "raw");

    const meals = [];
    for (const meal of req.body) {
      const data = { body: meal };
      const createdMeal = await super.create(data, res, "raw");
      const cleanMeal = DB_Provider.normalize(createdMeal);
      meals.push(cleanMeal);
    }

    return res.json(meals);
  }

  async update(req, res) {
    for (const meal of req.body) {
      const data = { body: meal };
      await super.update(data, res, "raw");
    }

    return res.json(null);
  }
}

export default new MealController();
