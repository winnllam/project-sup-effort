import { Router } from "express";
import { Stripe } from "stripe";
import { User } from "../models/user.js";

export const premiumRouter = Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

premiumRouter.post("/pay", async function (req, res, next) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "cad",
      amount: req.body.total,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

premiumRouter.post("/user", async function (req, res, next) {
  const userId = req.session.userId;
  const user = await User.findById(userId);
  if (user === null) {
    return res.status(404).json({ error: "User not found." });
  }

  let premium = user.premium;
  premium.status = "Active";
  premium.renewalStatus = req.body.planType;
  let expiryDate = new Date();
  if (req.body.planType === "Monthly") {
    expiryDate.setMonth(expiryDate.getMonth() + 1);
  } else {
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  }
  premium.expirationDate = expiryDate;
  user.save();

  return res.json({ user });
});
