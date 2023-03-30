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
    const { name, userPic, lastLoginDate } = this.state;
    return (
      <div className={styles.pannel}>
        <div id={styles.user}>
          <img src={userPic} id={styles.userPic} alt="user pic"></img>
          <div class={styles.username}>{name}</div>
          <div id={styles.lastLogin}>Last Login: {lastLoginDate}</div>
          {this.state.userStatus === "basic" && (
            <button
              class={styles.button}
              onClick={() => this.setState({ section: "profile" })}
            >
              Profile
            </button>
          )}
          <br />
          {this.state.userStatus === "basic" && (
            <button
              class={styles.button}
              onClick={() => this.setState({ section: "history" })}
            >
              History
            </button>
          )}
          <br />
          {this.state.userStatus === "basic" && (
            <button
              class={styles.button}
              onClick={() => this.setState({ section: "compete" })}
            >
              Competition
            </button>
          )}

          {this.state.userStatus === "admin" && (
            <button
              class={styles.button}
              onClick={() => this.setState({ section: "admin-problems" })}
            >
              {/* Problems */}
              <Link to="/dashboard/admin/problems" class={styles.options}>
                Problems
              </Link>
            </button>
          )}
          <br />
          {this.state.userStatus === "admin" && (
            <button
              class={styles.button}
              onClick={() => this.setState({ section: "admin-users" })}
            >
              Users
            </button>
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
