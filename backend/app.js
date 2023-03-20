import express from "express";
import path from "path";
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
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.SECRET_KEY || "test",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/users", usersRouter);
app.use("/api/problems", problemsRouter);
app.use("/api/compilers", compilersRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

httpServer.listen(9001, () => {
  console.log("Socket server on http://localhost:9001");
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("send-code", (code) => {
    socket.broadcast.emit("receive-code", code);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
