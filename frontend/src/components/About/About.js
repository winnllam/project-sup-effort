import React from "react";
import aboutStyles from "./About.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import devProductivity from "../../assets/dev_productivity.svg";
import MediaQuery from "react-responsive";

class About extends React.Component {
  render() {
    return (
      <div className={aboutStyles.about}>
        <div id={aboutStyles.aboutBox}>
          <MediaQuery minWidth={1090}>
            <Row>
              <Col md={5}>
                <img
                  src={devProductivity}
                  alt="Dev Producitivty"
                  className={aboutStyles.graphics}
                />
              </Col>
              <Col md={{ span: 7 }}>
                <div className={aboutStyles.introText}>
                  <div id={aboutStyles.aboutTitle}>
                    Made by developers for developers
                  </div>
                  <div className={aboutStyles.textBlock}>
                    With a deep understanding of the coding world and the needs
                    of our community, we are committed to creating a platform
                    that provides a fun, challenging, and engaging environment
                    for coders of all skill levels, designed specifically with
                    our fellow developers in mind.
                  </div>
                </div>
              </Col>
            </Row>
          </MediaQuery>
          <MediaQuery maxWidth={1089}>
            <div className={aboutStyles.graphicsBoxMobile}>
              <img
                src={devProductivity}
                alt="Dev Producitivty"
                className={aboutStyles.graphicsMobile}
              />
            </div>
            <div className={aboutStyles.introTextMobile}>
              <div id={aboutStyles.aboutTitleMobile}>
                Made by developers for developers
              </div>
              <div className={aboutStyles.textBlockMobile}>
                With a deep understanding of the coding world and the needs of
                our community, we are committed to creating a platform that
                provides a fun, challenging, and engaging environment for coders
                of all skill levels, designed specifically with our fellow
                developers in mind.
              </div>
            </div>
          </MediaQuery>
        </div>
      </div>
    );
  }
}
export default About;
