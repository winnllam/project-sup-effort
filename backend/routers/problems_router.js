import { Router } from "express";
import { Problem } from "../models/problem.js";
import { Sequence } from "../models/sequence.js";

export const problemsRouter = Router();

problemsRouter.post("/", async function (req, res, next) {
  const nextNum = await Sequence.next("ProblemNumber");

  const problem = new Problem({
    number: nextNum,
    name: req.body.name,
    description: req.body.description,
    difficulty: req.body.difficulty,
  });

  try {
    await problem.save();
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
  return res.json({ problem });
});

problemsRouter.patch("/", async function (req, res, next) {
  const name = req.body.name;
  const description = req.body.description;
  const difficulty = req.body.difficulty;

  const filter = { number: req.body.number };
  const update = {
    $set: { name: name, description: description, difficulty: difficulty },
  };
  const problem = await Problem.updateOne(filter, update);

  if (problem === null) {
    return res
      .status(404)
      .json({ error: "problem number:" + req.body.number + " does not exist" });
  }

  return res.json({ problem });
});

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

problemsRouter.post("/starter", async function (req, res, next) {
  const problem = await Problem.findOne({ number: req.body.number });
  if (!problem) {
    return res
      .status(404)
      .json({ error: "problem number:" + req.body.number + " does not exist" });
  }

  // TODO: check for dupe language
  const starter = { language: req.body.language, code: req.body.code };
  problem.starterCode.push(starter);

  try {
    await problem.save();
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
  return res.json({ problem });
});

problemsRouter.post("/solution", async function (req, res, next) {
  const problem = await Problem.findOne({ number: req.body.number });
  if (!problem) {
    return res
      .status(404)
      .json({ error: "problem number:" + req.body.number + " does not exist" });
  }

  // TODO: check for dupe language
  const solution = { language: req.body.language, code: req.body.code };
  problem.sampleSolution.push(solution);

  try {
    await problem.save();
  } catch (error) {
    return res.status(422).json({ message: error.message });
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

  return res.status(404).json({
    error: "solution in language:" + req.params.lang + " does not exist",
  });
});

problemsRouter.post("/testCases", async function (req, res, next) {
  const problem = await Problem.findOne({ number: req.body.number });
  if (!problem) {
    return res
      .status(404)
      .json({ error: "problem number:" + req.body.number + " does not exist" });
  }

  const test = { input: req.body.input, output: req.body.output };
  problem.testCases.push(test);

  try {
    await problem.save();
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
  return res.json({ problem });
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
