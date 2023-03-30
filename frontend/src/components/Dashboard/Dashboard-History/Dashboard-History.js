import React from "react";
import styles from "./Dashboard-History.module.css";
import image from "../../../assets/dashboard_history.svg";
import dashboardStyles from "../../../pages/Dashboard/Dashboard.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DashboardHistory = () => {
  return (
    <div className={styles.history}>
      <div class={styles.subtitle}>Coding History</div>
      <div id={styles.headerBox}>
        <Row>
          <Col md={4} class={styles.boxTitle}>
            Date
          </Col>
          <Col md={4} class={styles.boxTitle}>
            Question
          </Col>
          <Col md={4} class={styles.boxTitle}>
            Result
          </Col>
        </Row>
      </div>
      <div class={styles.historyBox}>
        <Row>
          <Col md={4} class={styles.historyText}>
            March 6, 2023
          </Col>
          <Col md={4} class={styles.historyText}>
            FizzBuzz
          </Col>
          <Col md={4} class={styles.historyText}>
            Lose
          </Col>
        </Row>
      </div>
      <div class={styles.historyBox}>
        <Row>
          <Col md={4} class={styles.historyText}>
            March 6, 2023
          </Col>
          <Col md={4} class={styles.historyText}>
            FizzBuzz
          </Col>
          <Col md={4} class={styles.historyText}>
            Lose
          </Col>
        </Row>
      </div>
      <div class={styles.historyBox}>
        <Row>
          <Col md={4} class={styles.historyText}>
            March 6, 2023
          </Col>
          <Col md={4} class={styles.historyText}>
            FizzBuzz
          </Col>
          <Col md={4} class={styles.historyText}>
            Lose
          </Col>
        </Row>
      </div>
      <img
        src={image}
        class={dashboardStyles.graphics}
        alt="coding history"
      ></img>
    </div>
  );
};

export default DashboardHistory;
