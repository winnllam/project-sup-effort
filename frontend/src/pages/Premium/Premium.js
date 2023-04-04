import React from "react";
import premiumStyles from "./Premium.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import programming from "../../assets/programming.svg";
import upgrade from "../../assets/upgrade.svg";
import MediaQuery from "react-responsive";

const Premium = () => {
  return (
    <div className={premiumStyles.premium}>
      <MediaQuery minWidth={1090}>
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
                <div class={premiumStyles.priceDets}>
                  Billed 1st of Each Year
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div class={premiumStyles.features}>
          <div class={premiumStyles.planTitle}>Premium Features</div>
          <div class={premiumStyles.featureList}>
            Upgrade your coding game with our premium features! Our coding
            competition site offers a range of premium features, including
            access to exclusive challenges, advanced analytics and insights, and
            personalized coaching and support to help you take your coding
            skills to the next level. Join our premium membership today and
            unlock the full potential of our platform!
            <br />
            Our premium includes solutions to every coding problems.
          </div>
        </div>
        <div>
          <img
            src={programming}
            alt="Programming"
            class={premiumStyles.graphics}
          />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={1089}>
        <div class={premiumStyles.titleBox}>
          <div class={premiumStyles.graphicsBoxMobile}>
            <img
              src={upgrade}
              alt="Upgrade"
              class={premiumStyles.graphicsMobile}
            />
          </div>
          <h2 id={premiumStyles.titleMobile}>Divide and Conquer Premium</h2>
          <h5 id={premiumStyles.taglineMobile}>Find the right plan for you</h5>
        </div>
        <div class={premiumStyles.plans}>
          <div class={premiumStyles.planMobile}>
            <div class={premiumStyles.planTitleMobile}>Monthly Plan</div>
            <div class={premiumStyles.infoMobile}>
              <ul>
                <li class={premiumStyles.infoMobile}>Pay on a monthly basis</li>
                <li class={premiumStyles.infoMobile}>
                  Total of $119.88 for the year
                </li>
                <li class={premiumStyles.infoMobile}>
                  No commitment, cancel anytime!
                </li>
              </ul>
            </div>
            <div class={premiumStyles.priceMobile}>$9.99</div>
            <div class={premiumStyles.priceDetsMobile}>
              Billed 1st of Each Month
            </div>
          </div>
          <div class={premiumStyles.planMobile}>
            <div class={premiumStyles.planTitleMobile}>Yearly Plan</div>
            <div class={premiumStyles.infoMobile}>
              <ul>
                <li class={premiumStyles.infoMobile}>Pay on a yearly basis</li>
                <li class={premiumStyles.infoMobile}>
                  Save 16% with a yearly plan!
                </li>
                <li class={premiumStyles.infoMobile}>
                  No commitment, cancel anytime!
                </li>
              </ul>
            </div>
            <div class={premiumStyles.priceMobile}>$99.99</div>
            <div class={premiumStyles.priceDetsMobile}>
              Billed 1st of Each Year
            </div>
          </div>
        </div>
        <div class={premiumStyles.features}>
          <div class={premiumStyles.planTitleMobile}>Premium Features</div>
          <div class={premiumStyles.featureListMobile}>
            Upgrade your coding game with our premium features! Our coding
            competition site offers a range of premium features, including
            access to exclusive challenges, advanced analytics and insights, and
            personalized coaching and support to help you take your coding
            skills to the next level. Join our premium membership today and
            unlock the full potential of our platform!
            <br />
            Our premium includes solutions to every coding problems.
          </div>
        </div>
        <div>
          <div class={premiumStyles.graphicsBoxMobile}>
            <img
              src={programming}
              alt="Programming"
              class={premiumStyles.graphicsMobile}
            />
          </div>
        </div>
      </MediaQuery>
    </div>
  );
};

export default Premium;
