import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";

const PORT = 9000;
export const app = express();
app.use(bodyParser.json());

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

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
