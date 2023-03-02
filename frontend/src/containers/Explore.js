import React from "react";
import "./Explore.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import codeThinking from "../assets/code_thinking.svg";
import codeTyping from "../assets/code_typing.svg";

class Explore extends React.Component {
  render() {
    return (
      <div className="explore">
        <div id="intro">
          <h3 id="tagline">Introducing...</h3>
          <h1 id="webpage-name">Divide and Conquer</h1>
          <Row>
            <Col md={5}>
              <img src={codeThinking} alt="Code Thinking" class="graphics" />
            </Col>
            <Col md={{ span: "auto", offset: 1 }}>
              <div class="intro-text">
                <div class="subtitle">A new way to practice coding</div>
                <div class="text-block">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus ac ultricies lorem. In eget lectus at velit molestie
                  scelerisque id eget risus. Fusce dictum, urna sed condimentum
                  tincidunt, ante purus pellentesque metus, quis rhoncus magna
                  lorem eu metus. Aliquam malesuada porttitor orci, eget
                  molestie risus posuere vitae.
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div id="feature">
          <Row>
            <Col md={{ span: "auto", offset: 1 }}>
              <div class="intro-text">
                <div class="subtitle">A new way to practice coding</div>
                <div class="text-block">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus ac ultricies lorem. In eget lectus at velit molestie
                  scelerisque id eget risus. Fusce dictum, urna sed condimentum
                  tincidunt, ante purus pellentesque metus, quis rhoncus magna
                  lorem eu metus. Aliquam malesuada porttitor orci, eget
                  molestie risus posuere vitae.
                </div>
              </div>
            </Col>
            <Col md={5}>
              <img src={codeTyping} alt="Code Typing" class="graphics" />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Explore;
