import React from "react";
import styles from "./Problem.module.css";
import DashboardPannel from "../../../components/Dashboard/Dashboard-Pannel/Dashboard-Pannel";
import { withAuth0 } from "@auth0/auth0-react";
import Edit from "../../../components/Admin/Edit/Edit";
import NotFound from "../../Not-Found/Not-Found.js";
import * as userService from "../../../services/api/Users.js";

class Problem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemId: props.problemId,
      adminPrivilge: false,
    };
  }

  componentDidMount() {
    userService.getMe().then((res) => {
      this.setState({
        adminPrivilge: res.userStatus === "admin",
      });
    });
  }

  render() {
    const { problemId, adminPrivilge } = this.state;
    return (
      <div className={styles.page}>
        {adminPrivilge && (
          <div class={styles.problem}>
            <div id={styles.pannel}>
              <DashboardPannel />
            </div>
            <div id={styles.problemDetail}>
              <Edit problemId={problemId} />
            </div>
          </div>
        )}
        {!adminPrivilge && <NotFound />}
      </div>
    );
  }
}

export default withAuth0(Problem);
