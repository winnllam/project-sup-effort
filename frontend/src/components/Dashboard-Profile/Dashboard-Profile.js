import React from "react";
import styles from "./Dashboard-Profile.module.css";
import profile from "../../assets/profile.svg";
import dashboardStyles from "../../pages/Dashboard/Dashboard.module.css";

const DashboardProfile = () => {
  return (
    <div className={styles.profile}>
      <div class={styles.section}>
        <div class={styles.subtitle}>User Profile</div>
        <div class={styles.box}>
          <b>Name:</b> John Doe <br />
          <b>Username:</b> johndoe123
          <br />
          <b>Email:</b> john.doe@email.com <br />
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
  );
};

export default DashboardProfile;
