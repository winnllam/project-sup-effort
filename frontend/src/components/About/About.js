import React from "react";
import aboutStyles from "./About.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import devProductivity from "../../assets/dev_productivity.svg";

class About extends React.Component {
  render() {
    return (
      <div className={aboutStyles.about}>
        <div id={aboutStyles.aboutBox}>
          <Row>
            <Col md={5}>
              <img
                src={devProductivity}
                alt="Dev Producitivty"
                class={aboutStyles.graphics}
              />
            </Col>
            <Col md={{ span: 7 }}>
              <div class={aboutStyles.introText}>
                <div id={aboutStyles.aboutTitle}>
                  Made by developers for developers
                </div>
                <div class={aboutStyles.textBlock}>
                  With a deep understanding of the coding world and the needs of
                  our community, we are committed to creating a platform that
                  provides a fun, challenging, and engaging environment for
                  coders of all skill levels, designed specifically with our
                  fellow developers in mind.
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default About;
