import React from "react";
import styles from "./Checkout-Form.module.css";
import { PaymentElement } from "@stripe/react-stripe-js";
import * as paymentService from "../../services/api/Payments.js";
import * as emailService from "../../services/api/Emails.js";
import * as userService from "../../services/api/Users.js";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      isProcessing: false,
      planType: props.planType,
      planTotal: props.planTotal / 100,
      userEmail: "",
    };
  }

  componentDidMount() {
    userService.getMe().then((res) => {
      this.setState({
        userEmail: res.email,
      });
    });
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
          this.setState({ isProcessing: false });
        } else {
          paymentService.upgradeUser(this.state.planType).then(() => {
            const subject = "Premium Divide and Conquer Subscription";
            const text =
              "Reciept for Successful Payment to Divide and Conquer" +
              "Plan Type: " +
              this.state.planType +
              "Total:  " +
              this.state.planTotal +
              "Thank you for your purchase! Detailed information about your premium subscription can be found in your profile at https://divideandconquer.me";

            const html =
              "<h3>Reciept for Successful Payment to Divide and Conquer </h3>" +
              "<b>Plan Type</b>: " +
              this.state.planType +
              "<br/>" +
              "<b>Plan Total</b>: $" +
              this.state.planTotal +
              "<br/>" +
              "Thank you for your purchase! Detailed information about your premium subscription can be found in your profile at https://divideandconquer.me <br/>" +
              "Once more thank you for your support towards Divide and Conquer and we hope you enjoy your new premium subscription! <br/>";

            emailService.sendEmail(this.state.userEmail, subject, text, html);
            this.setState({ isProcessing: false });
            window.location.replace(`${window.location.origin}/dashboard`);
          });
        }
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
              {this.state.isProcessing ? "Processing ..." : "Pay Now"}
            </span>
          </button>
          {message !== "" && <div id={styles.paymentMessage}>{message}</div>}
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
