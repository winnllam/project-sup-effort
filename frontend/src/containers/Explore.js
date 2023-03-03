import React from "react";
import exploreStyles from "./Explore.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import About from "../components/About/About.js";
import codeThinking from "../assets/code_thinking.svg";
import codeTyping from "../assets/code_typing.svg";
import hackerMindset from "../assets/hacker_mindset.svg";

class Explore extends React.Component {
  render() {
    return (
      <div className={exploreStyles.explore}>
        <div id={exploreStyles.intro}>
          <h3 id={exploreStyles.tagline}>Introducing...</h3>
          <h1 id={exploreStyles.webpageName}>Divide and Conquer</h1>
          <Row>
            <Col md={5}>
              <img
                src={codeThinking}
                alt="Code Thinking"
                class={exploreStyles.graphics}
              />
            </Col>
            <Col md={{ span: "auto", offset: 1 }}>
              <div class={exploreStyles.introText}>
                <div class={exploreStyles.subtitle}>
                  A new way to practice coding
                </div>
                <div class={exploreStyles.textBlock}>
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
        <div id={exploreStyles.feature}>
          <Row>
            <Col md={{ span: 7, offset: 1 }}>
              <div class={exploreStyles.introText}>
                <div class={exploreStyles.subtitle}>
                  Compete in real time against users
                </div>
                <div class={exploreStyles.textBlock}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus ac ultricies lorem. In eget lectus at velit molestie
                  scelerisque id eget risus. Fusce dictum, urna sed condimentum
                  tincidunt, ante purus pellentesque metus, quis rhoncus magna
                  lorem eu metus. Aliquam malesuada porttitor orci, eget
                  molestie risus posuere vitae.
                </div>
              </div>
            </Col>
            <Col md={{ span: 4 }}>
              <img
                src={codeTyping}
                alt="Code Typing"
                class={exploreStyles.graphics}
              />
            </Col>
          </Row>
        </div>
        <div id={exploreStyles.techFeature}>
          <Row>
            <Col md={{ span: 4 }}>
              <div class={exploreStyles.introText}>
                <div class={exploreStyles.subtitle}>
                  Compete in popular languages
                </div>
                <div class={exploreStyles.textBlock}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus ac ultricies lorem. In eget lectus at velit molestie
                  scelerisque id eget risus. Fusce dictum, urna sed condimentum
                  tincidunt, ante purus pellentesque metus, quis rhoncus magna
                  lorem eu metus. Aliquam malesuada porttitor orci, eget
                  molestie risus posuere vitae.
                </div>
              </div>
            </Col>
            <Col md={{ span: 4 }}>
              <img
                src={hackerMindset}
                alt="Hacker Mindset"
                class={exploreStyles.graphics}
              />
            </Col>
            <Col md={{ span: 4 }}>
              <div class={exploreStyles.introText}>
                <div class={exploreStyles.subtitle}>Win award badges</div>
                <div class={exploreStyles.textBlock}>
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
        <About></About>
      </div>
    );
  }
}
export default Explore;
