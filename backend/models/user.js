import mongoose from "mongoose";

const premiumSchema = new mongoose.Schema({
  status: {
    required: true,
    type: String,
    enum: {
      values: ["Active", "Inactive"],
      message: "{VALUE} is not supported",
    },
    default: "Inactive",
  },
  expirationDate: {
    required: function () {
      this.status === "Active";
    },
    type: Date,
  },
  renewalStatus: {
    required: function () {
      this.status === "Active";
    },
    type: String,
    enum: {
      values: ["Monthly", "Yearly", ""],
      message: "{VALUE} is not supported",
    },
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
