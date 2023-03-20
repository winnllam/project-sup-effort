import express from "express";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { usersRouter } from "./routers/users_router.js";
import { problemsRouter } from "./routers/problems_router.js";
import { compilersRouter } from "./routers/compilers_router.js";
import { paymentRouter } from "./routers/payment_router.js";

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
app.use("/api/payments", paymentRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
