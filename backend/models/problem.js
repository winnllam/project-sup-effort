import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  language: {
    required: true,
    type: String,
    enum: {
      values: ["javascript", "java", "python"],
      message: "{VALUE} is not supported",
    },
  },
  code: {
    required: true,
    type: String,
  },
  methodName: {
    type: String,
  },
});

const testCaseSchema = new mongoose.Schema({
  number: {
    required: true,
    type: Number,
  },
  description: {
    required: false,
    type: String,
  },
  input: {
    required: true,
    type: String,
  },
  output: {
    required: true,
    type: String,
  },
});

const problemSchema = new mongoose.Schema({
  number: {
    required: true,
    type: Number,
  },
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  difficulty: {
    required: true,
    type: String,
    enum: {
      values: ["easy", "medium", "hard"],
      message: "{VALUE} is not supported",
    },
  },
  starterCode: [codeSchema],
  sampleSolution: [codeSchema],
  testCases: [testCaseSchema],
});

export const Problem = mongoose.model("Problem", problemSchema);
