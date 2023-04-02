import { Router } from "express";
import { User } from "../models/user.js";
import { isAuthenticated } from "../middleware/auth.js";

export const usersRouter = Router();

usersRouter.post("/signon", async (req, res) => {
  const currDate = new Date();
  const filter = { email: req.body.email };
  const update = { lastLoginDate: currDate };
  const existingUser = await User.findOneAndUpdate(filter, update);

  if (existingUser) {
    req.session.userId = existingUser.id;
    req.session.status = existingUser.userStatus;
    return res.json({ user: existingUser, newUser: false });
  } else {
    const premium = { status: "Inactive" };
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      lastLoginDate: currDate,
      creationDate: currDate,
      premium: premium,
    });

    try {
      await user.save();
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }

    const newUser = await User.findOne({
      email: req.body.email,
    });
    req.session.userId = newUser.id;
    req.session.status = newUser.userStatus;
    return res.json({ user, newUser: true });
  }
});

// usersRouter.post("/signup", async (req, res) => {
//   const username = req.body.username;
//   const existingUser = await User.findOne({
//     username: req.body.username,
//   });

//   if (existingUser) {
//     return res
//       .status(409)
//       .json({ error: "Username " + username + " already exists." });
//   }

//   const user = new User({
//     username: req.body.username,
//     email: req.body.email,
//     lastLoginDate: new Date(),
//   });

//   try {
//     await user.save();
//   } catch (error) {
//     return res.status(422).json({ message: error.message });
//   }
//   return res.json({ username: user.username });
// });

// usersRouter.post("/signin", async (req, res) => {
//   const filter = { username: req.body.username };
//   const update = { lastLoginDate: new Date() };
//   const user = await User.findOneAndUpdate(filter, update);

//   if (user === null) {
//     return res.status(401).json({ error: "Incorrect username." });
//   }

//   req.session.userId = user.id;
//   return res.json(user);
// });

usersRouter.get("/signout", function (req, res, next) {
  const userId = req.session.userId;
  req.session.userId = null;
  return res.json(userId);
});

usersRouter.get("/", isAuthenticated, async (req, res) => {
  const users = await User.find();

  return res.json({
    total: users.length,
    users: users,
  });
});

usersRouter.get("/me", isAuthenticated, async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findById(userId);
  if (user === null) {
    return res.status(404).json({ errors: "User not found." });
  }

  return res.json({
    userId: userId,
    username: user.username,
    email: user.email,
    userStatus: user.userStatus,
    lastLoginDate: user.lastLoginDate,
    creationDate: user.creationDate,
    premium: user.premium,
  });
});

usersRouter.get("/:id", isAuthenticated, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user === null) {
    return res.status(404).json({ errors: "User not found." });
  }

  return res.json({
    username: user.username,
    lastLoginDate: user.lastLoginDate,
  });
});

usersRouter.post("/:id/codingHistory", isAuthenticated, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user === null) {
    return res.status(404).json({ errors: "User not found." });
  }

  const history = {
    number: req.body.number,
    name: req.body.name,
    date: new Date(),
    result: req.body.result,
  };
  user.codingHistory.push(history);

  return res.json({ history });
});

usersRouter.get("/:id/codingHistory", isAuthenticated, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user === null) {
    return res.status(404).json({ errors: "User not found." });
  }

  const codingHistory = user.codingHistory;
  return res.json({
    total: codingHistory.length,
    history: codingHistory,
  });
});

usersRouter.patch("/:id/", isAuthenticated, async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user === null) {
    return res.status(404).json({ errors: "User not found." });
  }

  if (req.body.action === "upgrade") {
    user.userStatus = "admin";
  } else if (req.body.action === "downgrade") {
    user.userStatus = "basic";
  }
  user.save();
  return res.json(user);
});
