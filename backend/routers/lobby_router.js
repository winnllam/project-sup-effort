import { Router } from "express";
import { Lobby } from "../models/lobby.js";

export const lobbyRouter = Router();

lobbyRouter.post("/:id", async function (req, res, next) {
  const lobby = new Lobby({
    id: req.params.id,
    host: "abc",
    players: ["abc"],
    status: "Waiting",
    problem: 1,
  });

  try {
    await lobby.save();
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
  return res.json({ lobby });
});

lobbyRouter.get("/:id", async function (req, res, next) {
  const lobby = await Lobby.findOne({ id: req.params.id });
  if (!lobby) {
    return res
      .status(404)
      .json({ error: "lobby:" + req.params.id + " does not exist" });
  }

  return res.json({ lobby });
});

lobbyRouter.get("/", async function (req, res, next) {
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
