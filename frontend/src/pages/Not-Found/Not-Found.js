import React from "react";
import notFoundStyles from "./Not-Found.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import pageNotFound from "../../assets/page_not_found.svg";

class NotFound extends React.Component {
  render() {
    return (
      <div class={notFoundStyles.bg}>
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <img
              src={pageNotFound}
              alt="Page Not Found"
              class={notFoundStyles.image}
            />
            <p>There is nothing here!</p>
          </Col>
          <Col md={4}></Col>
        </Row>
      </div>
    );
  }
}

export default NotFound;
