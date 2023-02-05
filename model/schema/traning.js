import mongoose from "mongoose";

const Traning = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  media: [{ type: String, required: true }],
  exercises: [{ type: String, required: true, ref: "Exercise" }]
});

export default mongoose.model("Traning", Traning);
