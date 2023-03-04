import React from "react";
import premiumStyles from "./Premium.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import programming from "../../assets/programming.svg";
import upgrade from "../../assets/upgrade.svg";

const Premium = () => {
  return (
    <div className={premiumStyles.premium}>
      <div class={premiumStyles.titleBox}>
        <img src={upgrade} alt="Upgrade" class={premiumStyles.graphics} />
        <h2 id={premiumStyles.title}>Divide and Conquer Premium</h2>
        <h5 id={premiumStyles.tagline}>Find the right plan for you</h5>
      </div>
      <div class={premiumStyles.plans}>
        <Row>
          <Col md={{ span: 5, offset: 1 }}>
            <div class={premiumStyles.plan}>
              <div class={premiumStyles.planTitle}>Monthly Plan</div>
              <div class={premiumStyles.info}>
                <ul>
                  <li>Some info</li>
                  <li>Some info</li>
                  <li>Some info</li>
                </ul>
              </div>
              <div class={premiumStyles.price}>$9.99</div>
              <div class={premiumStyles.priceDets}>
                Billed 1st of Each Month
              </div>
            </div>
          </Col>
          <Col md={{ span: 5 }}>
            <div class={premiumStyles.plan}>
              <div class={premiumStyles.planTitle}>Yearly Plan</div>
              <div class={premiumStyles.info}>
                <ul>
                  <li>Some info</li>
                  <li>Some info</li>
                  <li>Some info</li>
                </ul>
              </div>
              <div class={premiumStyles.price}>$99.99</div>
              <div class={premiumStyles.priceDets}>Billed 1st of Each Year</div>
            </div>
          </Col>
        </Row>
      </div>
      <div class={premiumStyles.features}>
        <div class={premiumStyles.planTitle}>Premium Features</div>
        <div class={premiumStyles.featureList}>TO BE DONE</div>
      </div>
      <div>
        <img
          src={programming}
          alt="Programming"
          class={premiumStyles.graphics}
        />
      </div>
    </div>
  );
};

export default Premium;
