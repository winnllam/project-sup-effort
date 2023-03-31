import React from "react";
import styles from "./Competition.module.css";
import { withAuth0 } from "@auth0/auth0-react";
import DashboardPannel from "../../components/Dashboard/Dashboard-Pannel/Dashboard-Pannel";
import DashboardCompetition from "../../components/Dashboard/Dashboard-Competition/Dashboard-Competition";

class Competition extends React.Component {
  render() {
    return (
      <div className={styles.competition}>
        <div id={styles.pannel}>
          <DashboardPannel />
        </div>
        <div id={styles.compete}>
          <DashboardCompetition />
        </div>
      </div>
    );
  }
}

export default withAuth0(Competition);
