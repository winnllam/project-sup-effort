import React from "react";
import styles from "./Checkout-Form.module.css";
import { PaymentElement } from "@stripe/react-stripe-js";
import * as paymentService from "../../services/api/Payments.js";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      isProcessing: false,
      planType: props.planType,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      return;
    }

    this.setState({ isProcessing: true });
    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/dashboard`,
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          if (
            result.error.type === "card_error" ||
            result.error.type === "validation_error"
          ) {
            this.setState({ message: result.error.message });
          } else {
            this.setState({ message: "An unexpected error occured." });
          }
        } else {
          paymentService.upgradeUser(this.state.planType).then((res) => {});
        }
        this.setState({ isProcessing: false });
        window.location.replace(`${window.location.origin}/dashboard`);
      });
  };

  render() {
    const { message, isProcessing } = this.state;
    return (
      <div className={styles.form}>
        <form id={styles.paymentForm} onSubmit={this.handleSubmit}>
          <div class={styles.subtitle}>Payment Information</div>
          <PaymentElement />
          <button
            disabled={isProcessing}
            id={styles.submit}
            class={styles.button}
          >
            <span id={styles.buttonText}>
              {this.state.isProcessing ? "Processing ..." : "Pay now"}
            </span>
          </button>
          {message !== "" && <div id={styles.paymentMessage}>{message}</div>}
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
