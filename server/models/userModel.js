import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Password field
  publicKey: { type: String, required: true },
  quiz: {
    "quiz#1": { type: String, required: true },
    "quiz#2": { type: String, required: true },
  },
  class: [{ type: String, required: true }],
  grade: [{ type: String, required: true }],
  attendance: [{ type: Number, required: true }],
});

// Create a User model
const User = mongoose.model("User", userSchema);

export default User;
