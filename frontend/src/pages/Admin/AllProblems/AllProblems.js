import React from "react";
import styles from "./AllProblems.module.css";
import { withAuth0 } from "@auth0/auth0-react";
import DashboardPannel from "../../../components/Dashboard/Dashboard-Pannel/Dashboard-Pannel";
import ProblemList from "../../../components/Admin/Problem-List/Problem-List";

class AdminProblems extends React.Component {
  render() {
    return (
      <div className={styles.problems}>
        <div id={styles.pannel}>
          <DashboardPannel />
        </div>
        <div id={styles.problemList}>
          <ProblemList />
        </div>
      </div>
    );
  }
}

export default withAuth0(AdminProblems);
