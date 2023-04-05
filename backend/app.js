import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import { usersRouter } from "./routers/users_router.js";
import { problemsRouter } from "./routers/problems_router.js";
import { compilersRouter } from "./routers/compilers_router.js";
import { lobbiesRouter } from "./routers/lobbies_router.js";
import { emailsRouter } from "./routers/email_router.js";
import { premiumRouter } from "./routers/premium_router.js";
import { useParams } from "react-router";

const PORT = 9000;
export const app = express();
app.use(bodyParser.json());

dotenv.config();

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://divideandconquer.me/",
    "http://localhost:9000",
  ],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/users", usersRouter);
app.use("/api/problems", problemsRouter);
app.use("/api/compilers", compilersRouter);
app.use("/api/lobbies", lobbiesRouter);
app.use("/api/emails", emailsRouter);
app.use("/api/premium", premiumRouter);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://divideandconquer.me/",
      "http://localhost:9000",
    ],
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});

httpServer.listen(process.env.PORT || 9000, () => {
  console.log(`Socket server on ${process.env.PORT || 9000}`);
});

io.on("connection", (socket) => {
  console.log("New client connected " + socket.id);

  socket.on("join-room", (room) => {
    console.log("Joining room: " + room);
    socket.join(room);
  });

  socket.on("user-connected", (message, room) => {
    socket.to(room).emit("user-connected", message);
  });

  socket.on("send-message", (message, room) => {
    socket.to(room).emit("receive-message", message);
  });

  socket.on("send-code", (id, code, room, language, user) => {
    console.log(id, code, language, user);
    socket.to(room).emit("receive-code", code, language, user);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

io.listen(httpServer);
