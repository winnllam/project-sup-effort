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
    const { stripe, elements } = this.props;
  }

  submitPayment = async (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className={styles.form}>
        <form id={styles.paymentForm} onSubmit={this.submitPayment}>
          <PaymentElement />
          <button disabled={!this.props.stripe} id={styles.submit}>
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
