import React from "react";
import styles from "./Dashboard-Profile.module.css";
import profile from "../../assets/profile.svg";
import dashboardStyles from "../../pages/Dashboard/Dashboard.module.css";
import * as userService from "../../services/api/Users.js";

class DashboardProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      creationDate: null,
    };
  }

  componentDidMount() {
    userService.getMe().then((res) => {
      this.setState({
        username: res.username,
        email: res.email,
        creationDate: res.creationDate,
      });
    });
  }

  render() {
    const { username, email, creationDate } = this.state;
    return (
      <div className={styles.profile}>
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
            <b>Premium Account:</b> Yes <br />
            <b>Expiry Date:</b> March 31, 2023
            <br />
            <b>Plan Type:</b> Monthly
          </div>
        </div>

        <img src={profile} class={dashboardStyles.graphics} alt="profile"></img>
      </div>
    );
  }
}

export default DashboardProfile;
