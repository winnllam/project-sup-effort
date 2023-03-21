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

problemsRouter.patch("/:id", async function (req, res, next) {
  const name = req.body.name;
  const description = req.body.description;
  const difficulty = req.body.difficulty;

  const filter = { number: req.params.id };
  const update = {
    $set: { name: name, description: description, difficulty: difficulty },
  };
  const problem = await Problem.updateOne(filter, update);

  if (problem === null) {
    return res
      .status(404)
      .json({ error: "problem number:" + req.params.id + " does not exist" });
  }

  return res.json({ problem });
});

problemsRouter.get("/", async function (req, res, next) {
  const problems = await Problem.find(
    {},
    { starterCode: 0, sampleSolution: 0, testCases: 0 }
  );
  return res.json({ problems });
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

problemsRouter.post("/:id/starter", async function (req, res, next) {
  const problem = await Problem.findOne({ number: req.params.id });
  if (!problem) {
    return res
      .status(404)
      .json({ error: "problem number:" + req.params.id + " does not exist" });
  }

  const starter = {
    language: req.body.language,
    code: req.body.code,
    methodName: req.body.methodName,
  };

  // check if language already exists
  const starterCodes = problem.starterCode;
  let index = -1;
  for (let i = 0; i < starterCodes.length; i++) {
    if (starterCodes[i].language === req.body.language) {
      index = i;
      break;
    }
  }

  // add to list if language is not already in, otherwise replace
  if (index === -1) {
    problem.starterCode.push(starter);
  } else {
    starterCodes[index] = starter;
    problem.starterCode = starterCodes;
  }

  try {
    await problem.save();
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
  return res.json({ problem });
});

problemsRouter.get("/:id/starter/:lang", async function (req, res, next) {
  const problem = await Problem.findOne({ number: req.params.id });
  if (!problem) {
    return res
      .status(404)
      .json({ error: "problem number:" + req.params.id + " does not exist" });
  }

  const starter = problem.starterCode;
  for (let i = 0; i < starter.length; i++) {
    if (starter[i].language == req.params.lang) {
      return res.json({ starter: starter[i] });
    }
  }

  return res.status(404).json({
    error: "starter code in language:" + req.params.lang + " does not exist",
  });
});

problemsRouter.post("/:id/solution", async function (req, res, next) {
  const problem = await Problem.findOne({ number: req.params.id });
  if (!problem) {
    return res
      .status(404)
      .json({ error: "problem number:" + req.params.id + " does not exist" });
  }

  const solution = { language: req.body.language, code: req.body.code };

  // check if language already exists
  const solutionCodes = problem.sampleSolution;
  let index = -1;
  for (let i = 0; i < solutionCodes.length; i++) {
    if (solutionCodes[i].language === req.body.language) {
      index = i;
      break;
    }
  }

  // add to list if language is not already in, otherwise replace
  if (index === -1) {
    problem.solutionCode.push(solution);
  } else {
    solutionCodes[index] = solution;
    problem.sampleSolution = solutionCodes;
  }

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

problemsRouter.post("/:id/testCases", async function (req, res, next) {
  const problem = await Problem.findOne({ number: req.params.id });
  if (!problem) {
    return res
      .status(404)
      .json({ error: "problem number:" + req.params.id + " does not exist" });
  }

  const seqId = "TestNumber" + req.params.id;
  const nextNum = await Sequence.next(seqId);
  let test = {
    number: nextNum,
    input: req.body.input,
    output: req.body.output,
  };
  if (req.body.description) {
    test = {
      number: nextNum,
      description: req.body.description,
      input: req.body.input,
      output: req.body.output,
    };
  }

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

problemsRouter.patch("/:id/testCases/:testId", async function (req, res, next) {
  const problem = await Problem.findOne({ number: req.params.id });
  if (!problem) {
    return res
      .status(404)
      .json({ error: "problem number:" + req.params.id + " does not exist" });
  }

  let tests = problem.testCases;
  const id = tests.findIndex(function (test) {
    return test.number === +req.params.testId;
  });

  tests[id].input = req.body.input;
  tests[id].output = req.body.output;

  problem.save();

  return res.json({ tests });
});
