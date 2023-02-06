import mongoose from "mongoose";

const Profile = new mongoose.Schema({
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
  gender: { type: String, required: false },
  birthday: { type: Date, required: false },
  program: { type: String, required: false, ref: "Program" }
});

export default mongoose.model("Profile", Profile);
