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
            <button class={styles.button}>
              <Link to={"/dashboard/profile"} class={styles.options}>
                Profile
              </Link>
            </button>
          )}
          <br />
          {userStatus === "basic" && (
            <button class={styles.button}>
              <Link to={"/dashboard/history"} class={styles.options}>
                History
              </Link>
            </button>
          )}
          <br />
          {userStatus === "basic" && (
            <button class={styles.button}>
              <Link to={"/dashboard/competition"} class={styles.options}>
                Competition
              </Link>
            </button>
          )}

          {userStatus === "admin" && (
            <button class={styles.button}>
              <Link to="/dashboard/admin/problems" class={styles.options}>
                Problems
              </Link>
            </button>
          )}
          <br />
          {userStatus === "admin" && (
            // TODO: Do this when doing admin invite
            <button class={styles.button}>Users</button>
          )}
          <br />
          {/* {this.state.userStatus === "admin" && (
            <button
              class={styles.button}
              onClick={() => this.setState({ section: "admin-settings" })}
            >
              Settings
            </button>
          )} */}
        </div>
      </div>
    );
  }
}

export default withAuth0(DashboardPannel);
