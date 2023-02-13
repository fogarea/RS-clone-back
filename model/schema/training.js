import mongoose from "mongoose";

const Training = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ru: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    ru: { type: String, required: true }
  },
  tag: [
    {
      en: { type: String, required: true },
      ru: { type: String, required: true }
    }
  ],
  icon: { type: String, required: true },
  media: { type: String, required: true },
  calories: { type: Number, required: true },
  program: { type: String, required: true, ref: "Program" }
});

export default mongoose.model("Training", Training);
