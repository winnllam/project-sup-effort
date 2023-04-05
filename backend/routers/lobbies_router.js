import { Router } from "express";
import { Lobby } from "../models/lobby.js";
import { Problem } from "../models/problem.js";
import { isAuthenticated } from "../middleware/auth.js";

export const lobbiesRouter = Router();

lobbiesRouter.post("/:id", isAuthenticated, async function (req, res, next) {
  const problems = await Problem.find({ difficulty: req.body.difficulty });
  const randomProblem = problems[Math.floor(Math.random() * problems.length)];

  const lobby = new Lobby({
    id: req.params.id,
    host: req.body.username,
    players: [],
    status: "Waiting",
    problem: randomProblem.number,
  });

  try {
    await lobby.save();
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
  return res.json({ lobby });
});

lobbiesRouter.get("/:id", isAuthenticated, async function (req, res, next) {
  const lobby = await Lobby.findOne({ id: req.params.id });
  if (!lobby) {
    return res
      .status(404)
      .json({ error: "lobby:" + req.params.id + " does not exist" });
  }

  return res.json({ lobby });
});

lobbiesRouter.post(
  "/:id/join",
  isAuthenticated,
  async function (req, res, next) {
    const lobby = await Lobby.findOne({ id: req.params.id });
    if (!lobby) {
      return res
        .status(404)
        .json({ error: "lobby:" + req.params.id + " does not exist" });
    }

    if (lobby.players.includes(req.body.username) === false) {
      console.log(lobby.players);
      lobby.players.push(req.body.username);
      console.log(lobby.players);
    } else {
      if (lobby.players.length >= 4) {
        return res.status(422).json({ message: "Lobby is full" });
      }
    }

    try {
      await lobby.save();
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }
    return res.json({ lobby });
  }
);

lobbiesRouter.get("/", isAuthenticated, async function (req, res, next) {
  const lobbies = await Lobby.find({}, { id: 1 });

  let lobbyList = [];
  for (let i = 0; i < lobbies.length; i++) {
    lobbyList.push(lobbies[i].id);
  }

  return res.json({
    total: lobbies.length,
    lobbies: lobbyList,
  });
});
