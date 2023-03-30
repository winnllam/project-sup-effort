import { Router } from "express";
import * as dotenv from "dotenv";
import sendgrid from "@sendgrid/mail";

dotenv.config();
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
const from = process.env.SENDGRID_EMAIL;

export const emailsRouter = Router();

emailsRouter.post("/send", async function (req, res, next) {
  const to = req.body.to;
  const subject = req.body.subject;
  const text = req.body.text;
  const html = req.body.html;
  const options = { to, from, subject, text, html };

  try {
    await sendgrid.send(options);
  } catch (error) {
    return res
      .status(422)
      .json({ error: "email could not be sent at this time" });
  }
  return res.status(200).json({ message: "email successfully sent" });
});
