import { Router } from "express";
import { Stripe } from "stripe";
import { User } from "../models/user.js";
import { isAuthenticated } from "../middleware/auth.js";

export const premiumRouter = Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

premiumRouter.post("/pay", isAuthenticated, async function (req, res, next) {
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

premiumRouter.patch(
  "/upgrade",
  isAuthenticated,
  async function (req, res, next) {
    const userId = req.session.userId;
    let user = await User.findById(userId);
    if (user === null) {
      return res.status(404).json({ error: "User not found." });
    }

    let premium = user.premium;
    premium.renewalStatus = req.body.planType;
    let expiryDate =
      premium.status === "Inactive"
        ? new Date()
        : new Date(premium.expirationDate);

    if (req.body.planType === "Monthly") {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }

    premium.expirationDate = expiryDate;
    premium.status = "Active";
    user.premium = premium;
    try {
      await user.save();
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }

    return res.json({ user });
  }
);

premiumRouter.patch(
  "/cancel",
  isAuthenticated,
  async function (req, res, next) {
    const userId = req.session.userId;
    const user = await User.findById(userId);
    if (user === null) {
      return res.status(404).json({ error: "User not found." });
    }

    user.premium.status = "Inactive";
    user.premium.expiryDate = new Date(null);
    user.premium.renewalStatus = "";
    try {
      await user.save();
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }

    return res.json({ user });
  }
);
