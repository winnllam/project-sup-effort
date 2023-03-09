import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Dashboard-Profile.module.css";
import profile from "../../assets/profile.svg";
import dashboardStyles from "../../pages/Dashboard/Dashboard.module.css";
import * as userService from "../../services/api/Users.js";

const DashboardProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  userService.getAllUsers().then((res) => console.log(res));

  return (
    isAuthenticated && (
      <div className={styles.profile}>
        <div class={styles.section}>
          <div class={styles.subtitle}>User Profile</div>
          <div class={styles.box}>
            <b>Name:</b> {user.name} <br />
            <b>Username:</b> johndoe123
            <br />
            <b>Email:</b> {user.email} <br />
            <b>Connection:</b> Email <br />
            <b>Member Since:</b> March 1, 2023
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
    )
  );
};

export default DashboardProfile;
