import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  userStatus: {
    required: true,
    type: String,
    enum: {
      values: ["basic", "premium"],
      message: "{VALUE} is not supported",
    },
    default: "basic",
  },
  lastLoginDate: {
    required: true,
    type: Date,
  },
  premium: premiumSchema,
});

const premiumSchema = new mongoose.Schema({
  status: {
    required: true,
    type: String,
    enum: {
      values: ["active", "inactive"],
      message: "{VALUE} is not supported",
    },
    default: "inactive",
  },
  expirationDate: {
    required: function () {
      this.status === "active";
    },
    type: Date,
  },
  renewalStatus: {
    required: function () {
      this.status === "active";
    },
    type: String,
    enum: {
      values: ["on", "off"],
      message: "{VALUE} is not supported",
    },
    default: "off",
  },
});

export const User = mongoose.model("User", userSchema);
