import mongoose from "mongoose";

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

const codeSchema = new mongoose.Schema({
  language: {
    required: true,
    type: String,
    enum: {
      values: ["javascript", "java", "python", "c"],
      message: "{VALUE} is not supported",
    },
  },
  code: {
    required: true,
    type: String,
  },
});

const testCaseSchema = new mongoose.Schema({
  input: {
    required: true,
    type: String,
  },
  output: {
    required: true,
    type: String,
  },
});

export const Problem = mongoose.model("Problem", problemSchema);
