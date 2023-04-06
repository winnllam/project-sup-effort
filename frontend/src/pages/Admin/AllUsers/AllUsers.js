import React from "react";
import styles from "./AllUsers.module.css";
import DashboardPannel from "../../../components/Dashboard/Dashboard-Pannel/Dashboard-Pannel";
import NotFound from "../../Not-Found/Not-Found.js";
import * as userService from "../../../services/api/Users.js";
import { withAuth0 } from "@auth0/auth0-react";
import UserList from "../../../components/Admin/User-List/User-List.js";

class AllUsers extends React.Component {
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
          <div className={styles.users}>
            <div id={styles.pannel}>
              <DashboardPannel />
            </div>
            <div id={styles.userList}>
              <UserList />
            </div>
          </div>
        )}
        {!adminPrivilge && <NotFound />}
      </div>
    );
  }
}

export default withAuth0(AllUsers);
