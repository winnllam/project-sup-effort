import mongoose from "mongoose";

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

const historySchema = new mongoose.Schema({
  number: {
    required: true,
    type: Number,
  },
  name: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Date,
  },
  result: {
    require: true,
    type: String,
    enum: {
      values: ["Winner", "Loser"],
      message: "{VALUE} is not supported",
    },
  },
});

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
      values: ["basic", "admin"],
      message: "{VALUE} is not supported",
    },
    default: "basic",
  },
  lastLoginDate: {
    required: true,
    type: Date,
  },
  creationDate: {
    required: true,
    type: Date,
  },
  premium: premiumSchema,
  codingHistory: [historySchema],
});

export const User = mongoose.model("User", userSchema);
