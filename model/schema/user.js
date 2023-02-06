import mongoose from "mongoose";

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, required: true },
  profile: { type: String, required: true, ref: "Profile" }
});

export default mongoose.model("User", User);
