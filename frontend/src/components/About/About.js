import React from "react";
import aboutStyles from "./About.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import devProductivity from "../../assets/dev_productivity.svg";

class About extends React.Component {
  render() {
    return (
      <div className={aboutStyles.about}>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                ac ultricies lorem. In eget lectus at velit molestie scelerisque
                id eget risus. Fusce dictum, urna sed condimentum tincidunt,
                ante purus pellentesque metus, quis rhoncus magna lorem eu
                metus. Aliquam malesuada porttitor orci, eget molestie risus
                posuere vitae.
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default About;
