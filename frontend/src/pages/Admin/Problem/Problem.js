import React from "react";
import styles from "./Problem.module.css";
import DashboardPannel from "../../../components/Dashboard/Dashboard-Pannel/Dashboard-Pannel";
import { withAuth0 } from "@auth0/auth0-react";
import Edit from "../../../components/Admin/Edit/Edit";

class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemId: props.problemId,
    };
  }

  render() {
    const { problemId } = this.state;
    return (
      <div className={styles.problem}>
        <div id={styles.pannel}>
          <DashboardPannel />
        </div>
        <div id={styles.problemDetail}>
          <Edit problemId={problemId} />
        </div>
      </div>
    );
  }
}

export default withAuth0(Problem);
