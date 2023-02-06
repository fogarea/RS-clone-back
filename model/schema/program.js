import mongoose from "mongoose";

const Program = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  media: [{ type: String, required: true }],
  training: [{ type: String, required: true, ref: "Training" }]
});

export default mongoose.model("Program", Program);
