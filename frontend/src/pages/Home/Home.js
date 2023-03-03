import React from "react";
import homeStyles from "./Home.module.css";
import About from "../../components/About/About";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import codeThinking from "../../assets/code_thinking.svg";
import codeTyping from "../../assets/code_typing.svg";
import hackerMindset from "../../assets/hacker_mindset.svg";

const Home = () => {
  return (
    <div className={homeStyles.explore}>
      <div id={homeStyles.intro}>
        <h3 id={homeStyles.tagline}>Introducing...</h3>
        <h1 id={homeStyles.webpageName}>Divide and Conquer</h1>
        <Row>
          <Col md={5}>
            <img
              src={codeThinking}
              alt="Code Thinking"
              class={homeStyles.graphics}
            />
          </Col>
          <Col md={{ span: "auto", offset: 1 }}>
            <div class={homeStyles.introText}>
              <div class={homeStyles.subtitle}>
                A new way to practice coding
              </div>
              <div class={homeStyles.textBlock}>
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
      <div id={homeStyles.feature}>
        <Row>
          <Col md={{ span: 7, offset: 1 }}>
            <div class={homeStyles.introText}>
              <div class={homeStyles.subtitle}>
                Compete in real time against users
              </div>
              <div class={homeStyles.textBlock}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                ac ultricies lorem. In eget lectus at velit molestie scelerisque
                id eget risus. Fusce dictum, urna sed condimentum tincidunt,
                ante purus pellentesque metus, quis rhoncus magna lorem eu
                metus. Aliquam malesuada porttitor orci, eget molestie risus
                posuere vitae.
              </div>
            </div>
          </Col>
          <Col md={{ span: 4 }}>
            <img
              src={codeTyping}
              alt="Code Typing"
              class={homeStyles.graphics}
            />
          </Col>
        </Row>
      </div>
      <div id={homeStyles.techFeature}>
        <Row>
          <Col md={{ span: 4 }}>
            <div class={homeStyles.introText}>
              <div class={homeStyles.subtitle}>
                Compete in popular languages
              </div>
              <div class={homeStyles.textBlock}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                ac ultricies lorem. In eget lectus at velit molestie scelerisque
                id eget risus. Fusce dictum, urna sed condimentum tincidunt,
                ante purus pellentesque metus, quis rhoncus magna lorem eu
                metus. Aliquam malesuada porttitor orci, eget molestie risus
                posuere vitae.
              </div>
            </div>
          </Col>
          <Col md={{ span: 4 }}>
            <img
              src={hackerMindset}
              alt="Hacker Mindset"
              class={homeStyles.graphics}
            />
          </Col>
          <Col md={{ span: 4 }}>
            <div class={homeStyles.introText}>
              <div class={homeStyles.subtitle}>Win award badges</div>
              <div class={homeStyles.textBlock}>
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
      <About></About>
    </div>
  );
};

export default Home;
