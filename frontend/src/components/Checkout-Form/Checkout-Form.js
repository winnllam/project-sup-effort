import React from "react";
import styles from "./Checkout-Form.module.css";
import { PaymentElement } from "@stripe/react-stripe-js";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      isProcessing: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      return;
    }

    this.setState({ isProcessing: true });
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard`, // TODO: Change to return somewhere better
      },
    });

    if (result.error) {
      this.setState({ message: result.error.message });
    }

    this.setState({ isProcessing: false });
  };

  render() {
    return (
      <div className={styles.form}>
        <form id={styles.paymentForm} onSubmit={this.handleSubmit}>
          <div class={styles.subtitle}>Payment Information</div>
          <PaymentElement />
          <button
            disabled={!this.props.stripe}
            id={styles.submit}
            class={styles.button}
          >
            <span id={styles.buttonText}>
              {this.state.isProcessing ? "Processing ..." : "Pay now"}
            </span>
          </button>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
