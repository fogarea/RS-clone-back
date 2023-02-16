import mongoose from "mongoose";

const Meal = new mongoose.Schema({
  type: { type: String, required: true },
  title: {
    en: { type: String, required: true },
    ru: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    ru: { type: String, required: true }
  },
  nutrition: {
    calories: { type: Number, required: true },
    carbs: { type: Number, required: true },
    protein: { type: Number, required: true },
    fat: { type: Number, required: true }
  },
  time: { type: Number, required: true },
  ingredients: [
    {
      amount: { type: String, required: true },
      unit: {
        en: { type: String, required: true },
        ru: { type: String, required: true }
      },
      name: {
        en: { type: String, required: true },
        ru: { type: String, required: true }
      }
    }
  ],
  steps: [
    {
      en: [{ type: String, required: true }],
      ru: [{ type: String, required: true }]
    }
  ],
  media: { type: String, required: true }
});

export default mongoose.model("Meal", Meal);
