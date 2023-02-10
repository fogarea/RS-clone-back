import mongoose from "mongoose";

const Meditation = new mongoose.Schema({
  owner: { type: String, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  media: { type: String, required: true },
  tracks: [{ type: String, required: false }]
});

export default mongoose.model("Meditation", Meditation);
