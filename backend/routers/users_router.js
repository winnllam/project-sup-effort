import { Router } from "express";
import { User } from "../models/user.js";

export const usersRouter = Router();

usersRouter.post("/signup", async (req, res) => {
  const user = new User({
    username: req.body.username,
  });

  try {
    await user.save();
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
  return res.json({ username: user.username });
});

usersRouter.post("/signin", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });

  if (user === null) {
    return res.status(401).json({ error: "Incorrect username." });
  }

  req.session.userId = user.id;
  return res.json(user);
});

usersRouter.get("/signout", function (req, res, next) {
  const userId = req.session.userId;
  req.session.userId = null;
  return res.json(userId);
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find();

  return res.json({
    total: users.length,
    users: users,
  });
});

usersRouter.get("/me", async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findById(userId);
  if (user === null) {
    return res.status(404).json({ errors: "User not found." });
  }

  return res.json({ username: user.name, userId: userId });
});
