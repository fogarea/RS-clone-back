import mongoose from "mongoose";

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: { type: Number, required: true, default: 0 },
  profile: { type: String, required: true, ref: "Profile" },
  progress: { type: String, required: true, ref: "Progress" },
  goals: {
    water: { type: Number, required: true, default: 0 },
    steps: { type: Number, required: true, default: 0 }
  },
  achievements: {
    fire: { type: Boolean, required: true, default: false },
    calendar: { type: Boolean, required: true, default: false },
    salad: { type: Boolean, required: true, default: false },
    dumbbells: { type: Boolean, required: true, default: false },
    water: { type: Boolean, required: true, default: false }
  }
});

export default mongoose.model("User", User);
