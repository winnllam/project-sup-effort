import React from "react";
import styles from "./Profile.module.css";
import { withAuth0 } from "@auth0/auth0-react";
import DashboardPannel from "../../components/Dashboard/Dashboard-Pannel/Dashboard-Pannel.js";
import DashboardProfile from "../../components/Dashboard/Dashboard-Profile/Dashboard-Profile.js";

class Profile extends React.Component {
  render() {
    return (
      <div className={styles.profile}>
        <div id={styles.pannel}>
          <DashboardPannel />
        </div>
        <div id={styles.userInfo}>
          <DashboardProfile />
        </div>
      </div>
    );
  }
}

export default withAuth0(Profile);
