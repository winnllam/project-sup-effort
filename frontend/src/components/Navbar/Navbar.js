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
import * as userService from "../../services/api/Users.js";
import MediaQuery from "react-responsive";
import { useState } from "react";

const Navbar = () => {
  const [openDropdown, setDropDown] = useState(false);

  const { loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();

  const handleLogOut = () => {
    userService.signOut().then(() => {
      logout({
        logoutParams: { returnTo: window.location.origin },
      });
    });
  };

  return (
    <div className={navbarStyles.page}>
      <MediaQuery minWidth={1090}>
        <div className={navbarStyles.header}>
          <Container fluid>
            <Row>
              <Col md={1}>
                <img src={logoUrl} alt="Divide and Conquer" />
              </Col>
              <Col md={4}>
                <div className={navbarStyles.titleBox}>
                  <Link to="/" id={navbarStyles.title}>
                    Divide and Conquer
                  </Link>
                </div>
              </Col>
              <Col md={"auto"}>
                <div className={navbarStyles.options}>
                  <Link to="/premium" id={navbarStyles.premium}>
                    Premium
                  </Link>
                </div>
              </Col>
              {!isAuthenticated && (
                <Col md={{ span: "auto" }}>
                  <div
                    id={navbarStyles.explore}
                    className={navbarStyles.options}
                  >
                    <Link
                      to={"/#" + homeStyles.feature}
                      className={navbarStyles.options}
                    >
                      Explore
                    </Link>
                  </div>
                </Col>
              )}
              {!isAuthenticated && (
                <Col md={"auto"}>
                  <div id={navbarStyles.about} className={navbarStyles.options}>
                    <Link
                      to={"/#" + aboutStyles.aboutBox}
                      className={navbarStyles.options}
                    >
                      About Us
                    </Link>
                  </div>
                </Col>
              )}
              <Col md={"auto"}>
                {isAuthenticated && !isLoading && (
                  <div
                    id={navbarStyles.dashboard}
                    className={navbarStyles.options}
                  >
                    <Link to="/dashboard" className={navbarStyles.options}>
                      Dashboard
                    </Link>
                  </div>
                )}
              </Col>
              <Col md={"auto"}>
                {isAuthenticated && !isLoading && (
                  <div
                    id={navbarStyles.dashboard}
                    className={navbarStyles.options}
                  >
                    <Link to="/problems" className={navbarStyles.options}>
                      Problems
                    </Link>
                  </div>
                )}
              </Col>
              <Col md={{ span: "auto", offset: 1 }}>
                {!isAuthenticated && !isLoading && (
                  <div
                    id={navbarStyles.login}
                    className={navbarStyles.options}
                    onClick={() => loginWithRedirect()}
                  >
                    Login
                  </div>
                )}
                {isAuthenticated && !isLoading && (
                  <div
                    id={navbarStyles.login}
                    className={navbarStyles.options}
                    onClick={handleLogOut}
                  >
                    Logout
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={1089}>
        <div
          className={navbarStyles.mobileHeader}
          onClick={() => {
            if (openDropdown) {
              setDropDown(false);
            } else {
              setDropDown(true);
            }
          }}
        >
          <div className={navbarStyles.hamburger}>
            <div className={navbarStyles.burger}></div>
            <div className={navbarStyles.burger}></div>
            <div className={navbarStyles.burger}></div>
          </div>

          <div>
            <img
              src={logoUrl}
              alt="Divide and Conquer"
              className={navbarStyles.logoMobile}
            />

            <Link to="/" id={navbarStyles.mobileTitle}>
              Divide and Conquer
            </Link>
          </div>
          <div className={navbarStyles.disclaimer}>
            <i>
              Note: Full functionality of the webpage requires a laptop or PC
              computer
            </i>
          </div>

          {openDropdown && (
            <div className={navbarStyles.dropdown}>
              <div className={navbarStyles.nav}>
                <Link to="/premium" id={navbarStyles.premium}>
                  Premium
                </Link>
                <div className={navbarStyles.nav}>
                  <Link
                    to={"/#" + homeStyles.feature}
                    className={navbarStyles.options}
                  >
                    Explore
                  </Link>
                </div>
                <div className={navbarStyles.nav}>
                  <Link
                    to={"/#" + aboutStyles.aboutBox}
                    className={navbarStyles.options}
                  >
                    About Us
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </MediaQuery>
    </div>
  );
};
export default Navbar;
