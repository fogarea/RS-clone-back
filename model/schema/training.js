import mongoose from "mongoose";

const Training = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: [{ type: String, required: true }],
  media: { type: String, required: true },
  calories: { type: Number, required: true }
});

export default mongoose.model("Training", Training);
