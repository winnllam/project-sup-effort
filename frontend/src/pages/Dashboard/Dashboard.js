import React from "react";
import dashboardStyles from "./Dashboard.module.css";
import pic from "../../assets/plane_square.jpeg";
import DashboardWelcome from "../../components/Dashboard-Welcome/Dashboard-Welcome";
import DashboardProfile from "../../components/Dashboard-Profile/Dashboard-Profile";
import DashboardHistory from "../../components/Dashboard-History/Dashboard-History";
import DashboardCompetition from "../../components/Dashboard-Competition/Dashboard-Competition";
import * as userService from "../../services/api/Users.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      section: "welcome",
    };
    userService.getAllUsers().then((res) => console.log(res));
    // userService.signUpUser("wines", "email").then((res) => console.log(res));
  }

  render() {
    return (
      <div className={dashboardStyles.dashboard}>
        <div id={dashboardStyles.user}>
          <img src={pic} id={dashboardStyles.userPic} alt="user pic"></img>
          <div class={dashboardStyles.username}>John Doe</div>
          <div id={dashboardStyles.lastLogin}>Last Login: March 5, 2023</div>
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
          {this.state.section === "profile" && <DashboardProfile />}
          {this.state.section === "history" && <DashboardHistory />}
          {this.state.section === "compete" && <DashboardCompetition />}
        </div>
      </div>
    );
  }
}

export default Dashboard;
