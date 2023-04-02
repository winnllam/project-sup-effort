import React from "react";
import styles from "./History.module.css";
import { withAuth0 } from "@auth0/auth0-react";
import DashboardPannel from "../../components/Dashboard/Dashboard-Pannel/Dashboard-Pannel";
import DashboardHistory from "../../components/Dashboard/Dashboard-History/Dashboard-History";
import NotFound from "../Not-Found/Not-Found.js";
import * as userService from "../../services/api/Users.js";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPrivilge: false,
    };
  }

  componentDidMount() {
    userService.getMe().then((res) => {
      this.setState({
        userPrivilge: res.userStatus === "basic",
      });
    });
  }

  render() {
    const { userPrivilge } = this.state;
    return (
      <div className={styles.page}>
        {userPrivilge && (
          <div class={styles.history}>
            <div id={styles.pannel}>
              <DashboardPannel />
            </div>
            <div id={styles.userHistory}>
              <DashboardHistory />
            </div>
          </div>
        )}
        {!userPrivilge && (
          <div class={styles.history}>
            <NotFound />
          </div>
        )}
      </div>
    );
  }
}

export default withAuth0(History);
