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
      planType: props.upgradeType,
      total: props.upgradeTotal,
    };
  }

  componentDidMount() {
    this.setState({
      stripePromise: loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY),
    });

    paymentService.createPaymentIntent(this.state.total).then((res) => {
      this.setState({ clientSecret: res.clientSecret });
    });
  }

  render() {
    const { clientSecret, stripePromise, planType } = this.state;
    return (
      <div className={styles.payment}>
        <div class={styles.subtitle}>Divide and Conquer Checkout</div>
        <div class={styles.plans}></div>
        {stripePromise && clientSecret !== "" && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <ElementsConsumer>
              {({ stripe, elements }) => (
                <CheckoutForm
                  stripe={stripe}
                  elements={elements}
                  planType={planType}
                />
              )}
            </ElementsConsumer>
          </Elements>
        )}
      </div>
    );
  }
}

export default Payment;
