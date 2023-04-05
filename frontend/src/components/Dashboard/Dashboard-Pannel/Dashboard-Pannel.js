import React from "react";
import styles from "./Dashboard-Pannel.module.css";
import * as userService from "../../../services/api/Users.js";
import { withAuth0 } from "@auth0/auth0-react";
import { HashLink as Link } from "react-router-hash-link";

class DashboardPannel extends React.Component {
  constructor(props) {
    super(props);

    const { user } = this.props.auth0;

    this.state = {
      name: user.nickname,
      userPic: user.picture,
      lastLoginDate: null,
      userStatus: null,
    };
  }

  componentDidMount() {
    userService.getMe().then((res) => {
      this.setState({
        lastLoginDate: res.lastLoginDate,
        userStatus: res.userStatus,
      });
    });
  }

  render() {
    const { name, userPic, lastLoginDate, userStatus } = this.state;
    return (
      <div className={styles.pannel}>
        <div id={styles.user}>
          <img src={userPic} id={styles.userPic} alt="user pic"></img>
          <div class={styles.username}>{name}</div>
          <div id={styles.lastLogin}>Last Login: {lastLoginDate}</div>
          {this.state.userStatus === "basic" && (
            <Link to={"/dashboard/profile"} class={styles.options}>
              <button class={styles.button}>Profile</button>
            </Link>
          )}
          <br />
          {userStatus === "basic" && (
            <Link to={"/dashboard/history"} class={styles.options}>
              <button class={styles.button}>History</button>
            </Link>
          )}
          <br />
          {userStatus === "basic" && (
            <Link to={"/dashboard/competition"} class={styles.options}>
              <button class={styles.button}>Competition</button>
            </Link>
          )}

          {userStatus === "admin" && (
            <Link to="/dashboard/admin/problems" class={styles.options}>
              <button class={styles.button}>Problems</button>
            </Link>
          )}
          <br />
          {userStatus === "admin" && (
            <Link to="/dashboard/admin/users" class={styles.options}>
              <button class={styles.button}>Users</button>
            </Link>
          )}
          <br />
        </div>
      </div>
    );
  }
}

export default withAuth0(DashboardPannel);
