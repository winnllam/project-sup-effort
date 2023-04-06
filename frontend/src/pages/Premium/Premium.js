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
        <div className={premiumStyles.titleBox}>
          <img src={upgrade} alt="Upgrade" className={premiumStyles.graphics} />
          <h2 id={premiumStyles.title}>Divide and Conquer Premium</h2>
          <h5 id={premiumStyles.tagline}>Find the right plan for you</h5>
        </div>
        <div className={premiumStyles.plans}>
          <Row>
            <Col md={{ span: 5, offset: 1 }}>
              <div className={premiumStyles.plan}>
                <div className={premiumStyles.planTitle}>Monthly Plan</div>
                <div className={premiumStyles.info}>
                  <ul>
                    <li>Pay on a monthly basis</li>
                    <li>Total of $119.88 for the year</li>
                    <li>No commitment, cancel anytime!</li>
                  </ul>
                </div>
                <div className={premiumStyles.price}>$9.99</div>
                <div className={premiumStyles.priceDets}>
                  Billed 1st of Each Month
                </div>
              </div>
            </Col>
            <Col md={{ span: 5 }}>
              <div className={premiumStyles.plan}>
                <div className={premiumStyles.planTitle}>Yearly Plan</div>
                <div className={premiumStyles.info}>
                  <ul>
                    <li>Pay on a yearly basis</li>
                    <li>Save 16% with a yearly plan!</li>
                    <li>No commitment, cancel anytime!</li>
                  </ul>
                </div>
                <div className={premiumStyles.price}>$99.99</div>
                <div className={premiumStyles.priceDets}>
                  Billed 1st of Each Year
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className={premiumStyles.features}>
          <div className={premiumStyles.planTitle}>Premium Features</div>
          <div className={premiumStyles.featureList}>
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
            className={premiumStyles.graphics}
          />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={1089}>
        <div className={premiumStyles.titleBox}>
          <div className={premiumStyles.graphicsBoxMobile}>
            <img
              src={upgrade}
              alt="Upgrade"
              className={premiumStyles.graphicsMobile}
            />
          </div>
          <h2 id={premiumStyles.titleMobile}>Divide and Conquer Premium</h2>
          <h5 id={premiumStyles.taglineMobile}>Find the right plan for you</h5>
        </div>
        <div className={premiumStyles.plans}>
          <div className={premiumStyles.planMobile}>
            <div className={premiumStyles.planTitleMobile}>Monthly Plan</div>
            <div className={premiumStyles.infoMobile}>
              <ul>
                <li className={premiumStyles.infoMobile}>
                  Pay on a monthly basis
                </li>
                <li className={premiumStyles.infoMobile}>
                  Total of $119.88 for the year
                </li>
                <li className={premiumStyles.infoMobile}>
                  No commitment, cancel anytime!
                </li>
              </ul>
            </div>
            <div className={premiumStyles.priceMobile}>$9.99</div>
            <div className={premiumStyles.priceDetsMobile}>
              Billed 1st of Each Month
            </div>
          </div>
          <div className={premiumStyles.planMobile}>
            <div className={premiumStyles.planTitleMobile}>Yearly Plan</div>
            <div className={premiumStyles.infoMobile}>
              <ul>
                <li className={premiumStyles.infoMobile}>
                  Pay on a yearly basis
                </li>
                <li className={premiumStyles.infoMobile}>
                  Save 16% with a yearly plan!
                </li>
                <li className={premiumStyles.infoMobile}>
                  No commitment, cancel anytime!
                </li>
              </ul>
            </div>
            <div className={premiumStyles.priceMobile}>$99.99</div>
            <div className={premiumStyles.priceDetsMobile}>
              Billed 1st of Each Year
            </div>
          </div>
        </div>
        <div className={premiumStyles.features}>
          <div className={premiumStyles.planTitleMobile}>Premium Features</div>
          <div className={premiumStyles.featureListMobile}>
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
          <div className={premiumStyles.graphicsBoxMobile}>
            <img
              src={programming}
              alt="Programming"
              className={premiumStyles.graphicsMobile}
            />
          </div>
        </div>
      </MediaQuery>
    </div>
  );
};

export default Premium;
