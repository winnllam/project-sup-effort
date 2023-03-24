import React from "react";
import dashboardStyles from "./Dashboard.module.css";
import DashboardWelcome from "../../components/Dashboard-Welcome/Dashboard-Welcome";
import DashboardProfile from "../../components/Dashboard-Profile/Dashboard-Profile";
import DashboardHistory from "../../components/Dashboard-History/Dashboard-History";
import DashboardCompetition from "../../components/Dashboard-Competition/Dashboard-Competition";
import * as userService from "../../services/api/Users.js";
import * as emailService from "../../services/api/Emails.js";
import { withAuth0 } from "@auth0/auth0-react";
import ProblemList from "../../components/Admin/Problem-List/Problem-List";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    const { user } = this.props.auth0;

    this.state = {
      name: user.nickname,
      userPic: user.picture,
      lastLoginDate: null,
      section: "welcome",
      userStatus: null,
    };

    userService.signOnUser(user.email, user.nickname).then((res) => {
      if (res.newUser === true) {
        // send email to new users
        const subject = "Welcome to Divide and Conquer!";
        const text = "Welcome text placeholder";
        const html =
          "Hello " +
          user.nickname +
          "! \n Thank you for signing up for Divide and Conquer!";
        emailService.sendEmail(user.email, subject, text, html);
      }
      this.setState({
        lastLoginDate: res.user.lastLoginDate,
        userStatus: res.user.userStatus,
      });
    });
  }

  render() {
    const { name, userPic, lastLoginDate } = this.state;
    return (
      <div className={dashboardStyles.dashboard}>
        <div id={dashboardStyles.user}>
          <img src={userPic} id={dashboardStyles.userPic} alt="user pic"></img>
          <div class={dashboardStyles.username}>{name}</div>
          <div id={dashboardStyles.lastLogin}>Last Login: {lastLoginDate}</div>
          {this.state.userStatus === "basic" && (
            <button
              class={dashboardStyles.button}
              onClick={() => this.setState({ section: "profile" })}
            >
              Profile
            </button>
          )}
          <br />
          {this.state.userStatus === "basic" && (
            <button
              class={dashboardStyles.button}
              onClick={() => this.setState({ section: "history" })}
            >
              History
            </button>
          )}
          <br />
          {this.state.userStatus === "basic" && (
            <button
              class={dashboardStyles.button}
              onClick={() => this.setState({ section: "compete" })}
            >
              Competition
            </button>
          )}

          {this.state.userStatus === "admin" && (
            <button
              class={dashboardStyles.button}
              onClick={() => this.setState({ section: "admin-problems" })}
            >
              Problems
            </button>
          )}
          <br />
          {this.state.userStatus === "admin" && (
            <button
              class={dashboardStyles.button}
              onClick={() => this.setState({ section: "admin-users" })}
            >
              Users
            </button>
          )}
          <br />
          {this.state.userStatus === "admin" && (
            <button
              class={dashboardStyles.button}
              onClick={() => this.setState({ section: "admin-settings" })}
            >
              Settings
            </button>
          )}
        </div>
        <div id={dashboardStyles.screen}>
          {this.state.section === "welcome" && <DashboardWelcome />}
          {this.state.section === "profile" && <DashboardProfile name={name} />}
          {this.state.section === "history" && <DashboardHistory />}
          {this.state.section === "compete" && <DashboardCompetition />}
          {this.state.section === "admin-problems" && <ProblemList />}
        </div>
      </div>
    );
  }
}

export default withAuth0(Dashboard);
