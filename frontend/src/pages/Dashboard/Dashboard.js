import React from "react";
import dashboardStyles from "./Dashboard.module.css";
import pic from "../../assets/plane_square.jpeg";
import DashboardWelcome from "../../components/Dashboard-Welcome/Dashboard-Welcome.js";
import DashboardProfile from "../../components/Dashboard-Profile/Dashboard-Profile";
import * as userService from "../../services/api/Users.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
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
          <button class={dashboardStyles.button}>Profile</button>
          <br />
          <button class={dashboardStyles.button}>History</button>
          <br />
          <button class={dashboardStyles.button}>Competition</button>
        </div>
        <div id={dashboardStyles.screen}>
          {/* <DashboardWelcome /> */}
          <DashboardProfile />
        </div>
      </div>
    );
  }
}

export default Dashboard;
