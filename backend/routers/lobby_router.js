import { Router } from "express";
import { Lobby } from "../models/lobby.js";
import { Sequence } from "../models/sequence.js";

export const lobbyRouter = Router();

lobbyRouter.post("/:id", async function (req, res, next) {
  const lobby = new Lobby({
    id: req.params.id,
    host:  "abc",
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
