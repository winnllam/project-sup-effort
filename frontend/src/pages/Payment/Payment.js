import React from "react";
import styles from "./Payment.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import * as paymentService from "../../services/api/Payments.js";
import CheckoutForm from "../../components/Checkout-Form/Checkout-Form";

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stripePromise: null,
      clientSecret: "",
    };
  }

  componentDidMount() {
    this.setState({
      stripePromise: loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY),
    });

    paymentService.createPaymentIntent().then((res) => {
      this.setState({ clientSecret: res.clientSecret });
    });
  }

  render() {
    const { clientSecret, stripePromise } = this.state;
    return (
      <div className={styles.payment}>
        <h1>React Stripe and Payment Element</h1>
        {stripePromise && clientSecret !== "" && (
          <Elements
            stripe={this.state.stripePromise}
            options={{ clientSecret }}
          >
            <CheckoutForm />
          </Elements>
        )}
      </div>
    );
  }
}

export default Payment;
