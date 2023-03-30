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
                  <li>Pay on a monthly basis</li>
                  <li>Total of $119.88 for the year</li>
                  <li>No commitment, cancel anytime!</li>
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
                  <li>Pay on a yearly basis</li>
                  <li>Save 16% with a yearly plan!</li>
                  <li>No commitment, cancel anytime!</li>
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
        <div class={premiumStyles.featureList}>
          Upgrade your coding game with our premium features! Our coding
          competition site offers a range of premium features, including access
          to exclusive challenges, advanced analytics and insights, and
          personalized coaching and support to help you take your coding skills
          to the next level. Join our premium membership today and unlock the
          full potential of our platform!
          <ul>
            Our premium includes:
            <li>Solutions to coding problems</li>
          </ul>
        </div>
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
