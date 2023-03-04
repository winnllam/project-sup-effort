import React from "react";
import Container from "react-bootstrap/Container";
import navbarStyles from "./Navbar.module.css";
import logoUrl from "../../assets/logo.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HashLink as Link } from "react-router-hash-link";
import homeStyles from "../../pages/Home/Home.module.css";
import aboutStyles from "../About/About.module.css";

const Navbar = () => {
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
          <Col md={{ span: "auto" }}>
            <div id={navbarStyles.explore} class={navbarStyles.options}>
              <Link to={"/#" + homeStyles.feature} class={navbarStyles.options}>
                Explore
              </Link>
            </div>
          </Col>
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
          <Col md={{ span: "auto", offset: 2 }}>
            <div id={navbarStyles.login} class={navbarStyles.options}>
              Login
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Navbar;
