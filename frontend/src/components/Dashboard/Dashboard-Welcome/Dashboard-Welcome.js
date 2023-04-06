import React from "react";
import styles from "./Dashboard-Welcome.module.css";
import dashboardImg from "../../../assets/dashboard_img.svg";
import dashboardStyles from "../../../pages/Dashboard/Dashboard.module.css";

const DashboardWelcome = () => {
  return (
    <div className={styles.dashboardWelcome}>
      <div id={styles.genericWelcome}>Welcome</div>
      <div id={styles.tagline}>Select an option on the left to get started</div>
      <img
        src={dashboardImg}
        className={dashboardStyles.graphics}
        alt="dashboard"
      ></img>
    </div>
  );
};

export default DashboardWelcome;
