import React from "react";
import styles from "./Dashboard-Profile.module.css";
import profile from "../../assets/profile.svg";
import dashboardStyles from "../../pages/Dashboard/Dashboard.module.css";
import * as userService from "../../services/api/Users.js";
import * as paymentService from "../../services/api/Payments.js";
import { Modal, Button } from "react-bootstrap";
import { HashLink as Link } from "react-router-hash-link";
import Row from "react-bootstrap/Row";

class DashboardProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      creationDate: null,
      premiumStatus: null,
      expirationDate: "--",
      renewalStatus: "--",
      upgrade: false,
      upgradeType: "Monthly",
      upgradeTotal: 999,
      timeToRenew: false,
      cancel: false,
    };
  }

  componentDidMount() {
    userService.getMe().then((res) => {
      this.setState({
        username: res.username,
        email: res.email,
        creationDate: res.creationDate,
        premiumStatus: res.premium.status,
      });

      if (res.premium.status === "Active") {
        const today = new Date();
        const expiry = res.premium.expirationDate;
        const diffTime = Math.abs(expiry - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        this.setState({
          expirationDate: expiry,
          renewalStatus: res.premium.renewalStatus,
          timeToRenew: diffDays <= 7,
        });
      }
    });
  }

  handleChange = (e) => {
    const total = e.target.value === "Monthly" ? 999 : 9999;
    this.setState({ upgradeType: e.target.value, upgradeTotal: total });
  };

  openUpgradeModal = () => this.setState({ upgrade: true });

  openCancelModal = () => this.setState({ cancel: true });

  closeUpgradeModal = () => this.setState({ upgrade: false });

  closeCancelModal = () => this.setState({ cancel: false });

  cancelSubscription = () => {
    paymentService.downgradeUser().then((res) => {
      this.setState({
        premiumStatus: "Inactive",
        expirationDate: "--",
        renewalStatus: "--",
      });
    });
  };

  render() {
    const {
      username,
      email,
      creationDate,
      premiumStatus,
      expirationDate,
      renewalStatus,
      upgradeType,
      upgradeTotal,
      timeToRenew,
    } = this.state;

    return (
      <div className={styles.profile}>
        <Modal
          show={this.state.upgrade}
          onHide={this.closeUpgradeModal}
          class={styles.modal}
        >
          <form onSubmit={this.submitUpgrade}>
            <Modal.Header closeButton>
              {premiumStatus === "Active" && <Modal.Title>Renewal</Modal.Title>}
              {premiumStatus === "Inactive" && (
                <Modal.Title>Upgrade to Premium</Modal.Title>
              )}
            </Modal.Header>
            <Modal.Body>
              <div class={styles.modalTitle}>Subscription Type</div>
              <select
                id={styles.planType}
                name="planType"
                defaultValue={this.state.upgradeType}
                onChange={this.handleChange}
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              <hr />
              <div class={styles.modalText}>
                <b>Total: </b>
                {this.state.upgradeTotal / 100}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Link to="/payment" state={{ upgradeType, upgradeTotal }}>
                Submit
              </Link>
            </Modal.Footer>
          </form>
        </Modal>
        <Modal
          show={this.state.cancel}
          onHide={this.closeCancelModal}
          class={styles.modal}
        >
          <form onSubmit={this.cancelSubscription}>
            <Modal.Header closeButton>
              <Modal.Title>Cancel Subscription</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class={styles.modalTitle}>
                Confirm Subscription Cancellation
              </div>
              <div class={styles.modalText}>
                You will immediatly lose access to premium features if you
                proceed to cancel
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type={"submit"}>Confirm</Button>
            </Modal.Footer>
          </form>
        </Modal>
        <div class={styles.section}>
          <div class={styles.subtitle}>User Profile</div>
          <div class={styles.box}>
            <b>Name:</b> {this.props.name} <br />
            <b>Username:</b> {username}
            <br />
            <b>Email:</b> {email} <br />
            <b>Connection:</b> Email <br />
            <b>Member Since:</b> {creationDate}
          </div>
        </div>

        <div class={styles.section}>
          <div class={styles.subtitle}>Premium Status</div>
          <div class={styles.box}>
            <b>Premium Account:</b> {premiumStatus} <br />
            <b>Expiry Date:</b> {expirationDate}
            <br />
            <b>Plan Type:</b> {renewalStatus}
            <br></br>
            {premiumStatus === "Inactive" && (
              <button
                class={styles.button}
                id={styles.upgradeBtn}
                onClick={this.openUpgradeModal}
              >
                Upgrade to Premium
              </button>
            )}
            {premiumStatus === "Active" && (
              <Row>
                {timeToRenew && (
                  <button
                    class={styles.button}
                    id={styles.upgradeBtn}
                    onClick={this.openUpgradeModal}
                  >
                    Renew Subscription
                  </button>
                )}

                <button
                  class={styles.button}
                  id={styles.upgradeBtn}
                  onClick={this.openCancelModal}
                >
                  Cancel Subscription
                </button>
              </Row>
            )}
          </div>
        </div>

        <img src={profile} class={dashboardStyles.graphics} alt="profile"></img>
      </div>
    );
  }
}

export default DashboardProfile;
