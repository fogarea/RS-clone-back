import mongoose from "mongoose";

const Program = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ru: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    ru: { type: String, required: true }
  },
  media: [{ type: String, required: true }],
  trainings: [{ type: String, required: true, ref: "Training" }]
});

export default mongoose.model("Program", Program);
