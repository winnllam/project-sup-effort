import { Router } from "express";
import { Problem } from "../models/problem.js";

export const problemsRouter = Router();

problemsRouter.get("/:id", async function (req, res, next) {
  const problem = await Problem.findOne(
    { number: req.params.id },
    { sampleSolution: 0, testCases: 0 }
  );
  if (!problem) {
    return res
      .status(404)
      .json({ error: "problem number:" + req.params.id + " does not exist" });
  }

  return res.json({ problem });
});

problemsRouter.get("/:id/solution/:lang", async function (req, res, next) {
  const problem = await Problem.findOne({ number: req.params.id });
  if (!problem) {
    return res
      .status(404)
      .json({ error: "problem number:" + req.params.id + " does not exist" });
  }

  const solutions = problem.sampleSolution;
  for (let i = 0; i < solutions.length; i++) {
    if (solutions[i].language == req.params.lang) {
      return res.json({ solution: solutions[i] });
    }
  }

  return res
    .status(404)
    .json({
      error: "soltuion for language:" + req.params.lang + " does not exist",
    });
});

problemsRouter.get("/:id/testCases", async function (req, res, next) {
  const problem = await Problem.findOne({ number: req.params.id });
  if (!problem) {
    return res
      .status(404)
      .json({ error: "problem number:" + req.params.id + " does not exist" });
  }

  const testCases = problem.testCases;
  return res.json({ total: testCases.length, test: testCases });
});
