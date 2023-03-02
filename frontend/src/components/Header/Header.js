import React from "react";
import Container from "react-bootstrap/Container";
import "./Header.css";
import logoUrl from "../../assets/logo.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Header = () => (
  <div className="header">
    <Container fluid>
      <Row>
        <Col md={1}>
          <img src={logoUrl} alt="Divide and Conquer" />
        </Col>
        <Col md={4}>
          <div id="title">Divide and Conquer</div>
        </Col>
        <Col md={"auto"}>
          <div id="premium" class="options">
            Premium
          </div>
        </Col>
        <Col md={{ span: "auto" }}>
          <div id="explore" class="options">
            Explore
          </div>
        </Col>
        <Col md={"auto"}>
          <div id="about" class="options">
            About Us
          </div>
        </Col>
        <Col md={{ span: "auto", offset: 2 }}>
          <div id="login" class="options">
            Login
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);
export default Header;
