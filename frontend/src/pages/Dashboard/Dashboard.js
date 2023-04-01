import React from "react";
import dashboardStyles from "./Dashboard.module.css";
import DashboardWelcome from "../../components/Dashboard/Dashboard-Welcome/Dashboard-Welcome";
import * as userService from "../../services/api/Users.js";
import * as emailService from "../../services/api/Emails.js";
import { withAuth0 } from "@auth0/auth0-react";
import DashboardPannel from "../../components/Dashboard/Dashboard-Pannel/Dashboard-Pannel";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };

    const { user } = this.props.auth0;

    userService.signOnUser(user.email, user.nickname).then((res) => {
      if (res.newUser === true) {
        // send email to new users
        const subject = "Welcome to Divide and Conquer!";
        const text =
          "Hello " +
          user.nickname +
          "! Thank you for signing up for Divide and Conquer! " +
          "Divide and Conquer is a competition site where you can compete on coding problems with your friends in real time! " +
          "We can't wait for you to get started!" +
          "Make sure to verify your email to be able to access all of the features we have to offer. Once that is done, you can divide right in!" +
          "Welcome to the D&C community!";

        const html =
          "<p>Hello <b>" +
          user.nickname +
          "</b>!</p>" +
          "<p>Thank you for signing up for Divide and Conquer!</p>" +
          "<p>Divide and Conquer is a competition site where you can compete on coding problems with your friends in real time! " +
          "We can't wait for you to get started!</p>" +
          "<p>Make sure to verify your email to be able to access all of the features we have to offer. Once that is done, you can divide right in!</p>" +
          "<p>Welcome to the D&C community!</p><br>";
        emailService.sendEmail(user.email, subject, text, html);
      }
      this.setState({ isLoaded: true });
    });
  }

  render() {
    const { isLoaded } = this.state;
    return (
      <div className={dashboardStyles.page}>
        {isLoaded && (
          <div class={dashboardStyles.dashboard}>
            <div id={dashboardStyles.pannel}>
              <DashboardPannel />
            </div>
            <div id={dashboardStyles.screen}>
              <DashboardWelcome />
            </div>
          </div>
        )}
        {!isLoaded && (
          <div class={dashboardStyles.dashboard}>
            <h3>Loading</h3>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth0(Dashboard);
