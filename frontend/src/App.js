import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Premium from "./pages/Premium/Premium";
import Credits from "./pages/Credits/Credits";
import CodingHook from "./pages/Coding/Coding-Hook";
import CodingLobbyHook from "./pages/Coding/Coding-Lobby-Hook";
import Problems from "./pages/Problems/Problems";
import { AuthenticationGuard } from "./components/authentication-guard";

class App extends Component {
  render() {
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
              path="/coding/:id"
              element={<AuthenticationGuard component={CodingLobbyHook} />}
            />
            <Route
              path="/problems"
              element={<AuthenticationGuard component={Problems} />}
            />
          </Routes>
          <Footer />
        </Router>
      </div>
    );
  }
}
export default App;
