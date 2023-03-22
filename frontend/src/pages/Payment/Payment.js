import React from "react";
import styles from "./Payment.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import * as paymentService from "../../services/api/Payments.js";
import CheckoutForm from "../../components/Checkout-Form/Checkout-Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stripePromise: null,
      clientSecret: "",
      type: props.upgradeType,
      total: props.upgradeTotal,
    };
  }

  componentDidMount() {
    this.setState({
      stripePromise: loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY),
    });

    paymentService.createPaymentIntent(999).then((res) => {
      this.setState({ clientSecret: res.clientSecret });
    });
  }

  render() {
    const { clientSecret, stripePromise } = this.state;
    return (
      <div className={styles.payment}>
        <div class={styles.subtitle}>Divide and Conquer Checkout</div>
        <div class={styles.plans}></div>
        {stripePromise && clientSecret !== "" && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <ElementsConsumer>
              {({ stripe, elements }) => (
                <CheckoutForm stripe={stripe} elements={elements} />
              )}
            </ElementsConsumer>
          </Elements>
        )}
      </div>
    );
  }
}

export default Payment;
