import React from "react";
import styles from "./Dashboard-Profile.module.css";
import profile from "../../../assets/profile.svg";
import dashboardStyles from "../../../pages/Dashboard/Dashboard.module.css";
import * as userService from "../../../services/api/Users.js";
import * as paymentService from "../../../services/api/Payments.js";
import { Modal } from "react-bootstrap";
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
    paymentService.downgradeUser().then(() => {
      this.setState({
        premiumStatus: "Inactive",
        expirationDate: "--",
        renewalStatus: "--",
      });
    });
    this.closeCancelModal();
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
      upgrade,
      cancel,
    } = this.state;

    return (
      <div className={styles.profile}>
        <Modal
          show={upgrade}
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
            <Modal.Body className={styles.modalBody}>
              <div className={styles.modalTitle}>Subscription Type</div>
              <select
                id={styles.planType}
                name="planType"
                defaultValue={upgradeType}
                onChange={this.handleChange}
              >
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              <hr />
              <div className={styles.modalText}>
                <b>Total: </b>${upgradeTotal / 100}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Link to="/payment" state={{ upgradeType, upgradeTotal }}>
                <button className={styles.submitButton}>Submit</button>
              </Link>
            </Modal.Footer>
          </form>
        </Modal>
        <Modal
          show={cancel}
          onHide={this.closeCancelModal}
          class={styles.modal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Cancel Subscription</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <div className={styles.modalTitle}>
              Confirm Subscription Cancellation
            </div>
            <div className={styles.modalText}>
              You will immediatly lose access to premium features if you proceed
              to cancel
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className={styles.submitButton}
              onClick={this.cancelSubscription}
            >
              Confirm
            </button>
          </Modal.Footer>
        </Modal>
        <div className={styles.section}>
          <div className={styles.subtitle}>User Profile</div>
          <div className={styles.box}>
            <b>Username:</b> {username}
            <br />
            <b>Email:</b> {email} <br />
            <b>Member Since:</b> {creationDate}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.subtitle}>Premium Status</div>
          <div className={styles.box}>
            <b>Premium Account:</b> {premiumStatus} <br />
            <b>Expiry Date:</b> {expirationDate}
            <br />
            <b>Plan Type:</b> {renewalStatus}
            <br></br>
            {premiumStatus === "Inactive" && (
              <button
                className={styles.button}
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
                    className={styles.button}
                    id={styles.upgradeBtn}
                    onClick={this.openUpgradeModal}
                  >
                    Renew Subscription
                  </button>
                )}

                <button
                  className={styles.button}
                  id={styles.upgradeBtn}
                  onClick={this.openCancelModal}
                >
                  Cancel Subscription
                </button>
              </Row>
            )}
          </div>
        </div>

        <img
          src={profile}
          className={dashboardStyles.graphics}
          alt="profile"
        ></img>
      </div>
    );
  }
}

export default DashboardProfile;
