import mongoose from "mongoose";

const Progress = new mongoose.Schema({
  watched: { type: Number, required: true, default: 0 },
  calories: { type: Number, required: true, default: 0 },
  finished: [{ type: String, required: false, ref: "Training" }]
});

export default mongoose.model("Progress", Progress);
