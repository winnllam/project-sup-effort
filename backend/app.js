import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { usersRouter } from "./routers/users_router.js";

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

app.use("/users", usersRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
