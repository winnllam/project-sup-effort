import React from "react";
import styles from "./AllProblems.module.css";
import { withAuth0 } from "@auth0/auth0-react";
import DashboardPannel from "../../../components/Dashboard/Dashboard-Pannel/Dashboard-Pannel";
import ProblemList from "../../../components/Admin/Problem-List/Problem-List";
import NotFound from "../../Not-Found/Not-Found.js";
import * as userService from "../../../services/api/Users.js";

class AdminProblems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { adminPrivilge } = this.state;
    return (
      <div className={styles.page}>
        {adminPrivilge && (
          <div class={styles.problems}>
            <div id={styles.pannel}>
              <DashboardPannel />
            </div>
            <div id={styles.problemList}>
              <ProblemList />
            </div>
          </div>
        )}
        {!adminPrivilge && <NotFound />}
      </div>
    );
  }
}

export default withAuth0(AdminProblems);
