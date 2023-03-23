import React from "react";
import styles from "./Dashboard-Profile.module.css";
import profile from "../../assets/profile.svg";
import dashboardStyles from "../../pages/Dashboard/Dashboard.module.css";
import * as userService from "../../services/api/Users.js";
import { Modal } from "react-bootstrap";
import { HashLink as Link } from "react-router-hash-link";

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
        this.setState({
          expirationDate: res.premium.expirationDate,
          renewalStatus: res.premium.renewalStatus,
        });
      }
    });
  }

  handleChange = (e) => {
    const total = e.target.value === "Monthly" ? 999 : 9999;
    this.setState({ upgradeType: e.target.value, upgradeTotal: total });
  };

  openUpgradeModal = () => this.setState({ upgrade: true });

  closeUpgradeModal = () => this.setState({ upgrade: false });

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
    } = this.state;

    return (
      <div className={styles.profile}>
        <Modal
          show={this.state.upgrade}
          onHide={this.closeUpgradeModal}
          class={styles.upgradeModal}
        >
          <form onSubmit={this.submitUpgrade}>
            <Modal.Header closeButton>
              <Modal.Title>Upgrade to Premium</Modal.Title>
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
              <div class={styles.modalCost}></div>
              <div class={styles.modalTotal}>
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
          </div>
        </div>

        <img src={profile} class={dashboardStyles.graphics} alt="profile"></img>
      </div>
    );
  }
}

export default DashboardProfile;
