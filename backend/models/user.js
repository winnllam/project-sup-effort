import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
