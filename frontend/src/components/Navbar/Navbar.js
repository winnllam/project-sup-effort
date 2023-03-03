import React from "react";
import Container from "react-bootstrap/Container";
import navbarStyles from "./Navbar.module.css";
import logoUrl from "../../assets/logo.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Navbar = () => (
  <div className={navbarStyles.header}>
    <Container fluid>
      <Row>
        <Col md={1}>
          <img src={logoUrl} alt="Divide and Conquer" />
        </Col>
        <Col md={4}>
          <div id={navbarStyles.title}>Divide and Conquer</div>
        </Col>
        <Col md={"auto"}>
          <div id={navbarStyles.premium} class={navbarStyles.options}>
            Premium
          </div>
        </Col>
        <Col md={{ span: "auto" }}>
          <div id={navbarStyles.explore} class={navbarStyles.options}>
            Explore
          </div>
        </Col>
        <Col md={"auto"}>
          <div id={navbarStyles.about} class={navbarStyles.options}>
            About Us
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
export default Navbar;
