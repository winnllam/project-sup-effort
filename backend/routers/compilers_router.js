import { Router } from "express";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

export const compilersRouter = Router();

const jdoodleURL = "https://api.jdoodle.com/v1";
const client = {
  clientId: process.env.JDOODLE_CLIENT_ID,
  clientSecret: process.env.JDOODLE_CLIENT_SECRET,
};

compilersRouter.post("/execute", function (req, res, next) {
  let body = client;
  body["script"] = req.body.script;
  body["language"] = req.body.language;
  if (req.body.language === "python") {
    body["language"] = "python3";
  }

  axios.post(jdoodleURL + "/execute", body).then((result) => {
    console.log(result.data);
    const ret = result.data;
    return res.json({ output: ret.output, statusCode: ret.statusCode });
  });
});
