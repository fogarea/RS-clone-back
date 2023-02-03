import mongoose from "mongoose";

const Exercise = new mongoose.Schema({
  title: { type: String, required: true },
  midia: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  tips: [{ type: String, required: true }],
  primary_muscles: [{ type: String, required: false }],
  secondary_muscles: [{ type: String, required: false }]
});

export default mongoose.model("Exercise", Exercise);
