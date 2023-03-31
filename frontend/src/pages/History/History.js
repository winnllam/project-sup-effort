import React from "react";
import styles from "./History.module.css";
import { withAuth0 } from "@auth0/auth0-react";
import DashboardPannel from "../../components/Dashboard/Dashboard-Pannel/Dashboard-Pannel";
import DashboardHistory from "../../components/Dashboard/Dashboard-History/Dashboard-History";

class History extends React.Component {
  render() {
    return (
      <div className={styles.history}>
        <div id={styles.pannel}>
          <DashboardPannel />
        </div>
        <div id={styles.userHistory}>
          <DashboardHistory />
        </div>
      </div>
    );
  }
}

export default withAuth0(History);
