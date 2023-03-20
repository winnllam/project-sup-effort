import { Router } from "express";
import axios from "axios";
import { Stripe } from "stripe";

export const paymentRouter = Router();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// TODO: Should this be post?
paymentRouter.post("/", async function (req, res, next) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "cad",
      amount: 99,
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
