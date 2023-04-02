import React from "react";
import Container from "react-bootstrap/Container";
import navbarStyles from "./Navbar.module.css";
import logoUrl from "../../assets/logo.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HashLink as Link } from "react-router-hash-link";
import homeStyles from "../../pages/Home/Home.module.css";
import aboutStyles from "../About/About.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import LobbyModal from "./LobbyModal";
import * as userService from "../../services/api/Users.js";

const Navbar = () => {
  const { loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();

  const handleLogOut = () => {
    userService.signOut().then(() => {
      logout({
        logoutParams: { returnTo: window.location.origin },
      });
    });
  };

  return (
    <div className={navbarStyles.header}>
      <Container fluid>
        <Row>
          <Col md={1}>
            <img src={logoUrl} alt="Divide and Conquer" />
          </Col>
          <Col md={4}>
            <div class={navbarStyles.titleBox}>
              <Link to="/" id={navbarStyles.title}>
                Divide and Conquer
              </Link>
            </div>
          </Col>
          <Col md={"auto"}>
            <div class={navbarStyles.options}>
              <Link to="/premium" id={navbarStyles.premium}>
                Premium
              </Link>
            </div>
          </Col>
          {!isAuthenticated && (
            <Col md={{ span: "auto" }}>
              <div id={navbarStyles.explore} class={navbarStyles.options}>
                <Link
                  to={"/#" + homeStyles.feature}
                  class={navbarStyles.options}
                >
                  Explore
                </Link>
              </div>
            </Col>
          )}
          {!isAuthenticated && (
            <Col md={"auto"}>
              <div id={navbarStyles.about} class={navbarStyles.options}>
                <Link
                  to={"/#" + aboutStyles.aboutBox}
                  class={navbarStyles.options}
                >
                  About Us
                </Link>
              </div>
            </Col>
          )}
          <Col md={"auto"}>
            {isAuthenticated && !isLoading && (
              <div id={navbarStyles.dashboard} class={navbarStyles.options}>
                <Link to="/dashboard" class={navbarStyles.options}>
                  Dashboard
                </Link>
              </div>
            )}
          </Col>
          <Col md={"auto"}>
            {isAuthenticated && !isLoading && (
              <div id={navbarStyles.dashboard} class={navbarStyles.options}>
                <Link to="/problems" class={navbarStyles.options}>
                  Problems
                </Link>
              </div>
            )}
          </Col>
          <Col md={{ span: "auto", offset: 1 }}>
            {!isAuthenticated && !isLoading && (
              <div
                id={navbarStyles.login}
                class={navbarStyles.options}
                onClick={() => loginWithRedirect()}
              >
                Login
              </div>
            )}
            {isAuthenticated && !isLoading && (
              <div
                id={navbarStyles.login}
                class={navbarStyles.options}
                onClick={handleLogOut}
              >
                Logout
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Navbar;
