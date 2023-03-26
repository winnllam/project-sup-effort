import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Premium from "./pages/Premium/Premium";
import Credits from "./pages/Credits/Credits";
import CodingHook from "./pages/Coding/Coding-Hook";
import PaymentHook from "./pages/Payment/Payment-Hook";
import Problems from "./pages/Problems/Problems";
import { AuthenticationGuard } from "./components/authentication-guard";
import * as userService from "./services/api/Users.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessPayment: true,
    };
  }

  componentDidMount() {
    userService.getMe().then((res) => {
      this.setState({
        accessPayment: res.userStatus === "admin",
      });
    });
  }

  render() {
    const { accessPayment } = this.state;
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/credits" element={<Credits />} />
            <Route
              path="/dashboard"
              element={<AuthenticationGuard component={Dashboard} />}
            />
            <Route
              path="/coding"
              element={<AuthenticationGuard component={CodingHook} />}
            />
            <Route
              path="/problems"
              element={<AuthenticationGuard component={Problems} />}
            />
            <Route
              path="/payment"
              element={<AuthenticationGuard component={PaymentHook} />}
            />
          </Routes>
          <Footer />
        </Router>
      </div>
    );
  }
}
export default App;
