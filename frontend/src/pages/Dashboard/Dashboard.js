import React from "react";
import dashboardStyles from "./Dashboard.module.css";
import DashboardWelcome from "../../components/Dashboard-Welcome/Dashboard-Welcome";
import DashboardProfile from "../../components/Dashboard-Profile/Dashboard-Profile";
import DashboardHistory from "../../components/Dashboard-History/Dashboard-History";
import DashboardCompetition from "../../components/Dashboard-Competition/Dashboard-Competition";
import * as userService from "../../services/api/Users.js";
import { withAuth0 } from "@auth0/auth0-react";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    const { user } = this.props.auth0;

    this.state = {
      name: user.nickname,
      userPic: user.picture,
      lastLoginDate: null,
    };

    userService.signOnUser(user.email, user.nickname).then((res) => {
      this.setState({ lastLoginDate: res.lastLoginDate });
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
          <button
            class={dashboardStyles.button}
            onClick={() => this.setState({ section: "profile" })}
          >
            Profile
          </button>
          <br />
          <button
            class={dashboardStyles.button}
            onClick={() => this.setState({ section: "history" })}
          >
            History
          </button>
          <br />
          <button
            class={dashboardStyles.button}
            onClick={() => this.setState({ section: "compete" })}
          >
            Competition
          </button>
        </div>
        <div id={dashboardStyles.screen}>
          {this.state.section === "welcome" && <DashboardWelcome />}
          {this.state.section === "profile" && <DashboardProfile name={name} />}
          {this.state.section === "history" && <DashboardHistory />}
          {this.state.section === "compete" && <DashboardCompetition />}
        </div>
      </div>
    );
  }
}

export default withAuth0(Dashboard);
