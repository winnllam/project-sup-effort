import React from "react";
import homeStyles from "./Home.module.css";
import About from "../../components/About/About";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import codeThinking from "../../assets/code_thinking.svg";
import codeTyping from "../../assets/code_typing.svg";
import hackerMindset from "../../assets/hacker_mindset.svg";
import MediaQuery from "react-responsive";

const Home = () => {
  return (
    <div className="home">
      <div id={homeStyles.intro}>
        <h3 id={homeStyles.tagline}>Introducing...</h3>
        <h1 id={homeStyles.webpageName}>Divide and Conquer</h1>
        <MediaQuery minWidth={1090}>
          <Row>
            <Col md={5}>
              <img
                src={codeThinking}
                alt="Code Thinking"
                className={homeStyles.graphics}
              />
            </Col>
            <Col md={{ span: "auto", offset: 1 }}>
              <div className={homeStyles.introText}>
                <div className={homeStyles.subtitle}>
                  A new way to practice coding
                </div>
                <div className={homeStyles.textBlock}>
                  Gone are the days of tedious exercises and repetitive drills.
                  Our platform offers a fun and engaging way to sharpen your
                  coding skills through exciting coding challenges and
                  competitions. With our innovative approach, you'll be able to
                  improve your coding abilities while enjoying the thrill of
                  friendly competition. Join us today and discover a whole new
                  world of coding practice!
                </div>
              </div>
            </Col>
          </Row>
        </MediaQuery>
        <MediaQuery maxWidth={1089}>
          <div className={homeStyles.graphicsBoxMobile}>
            <img
              src={codeThinking}
              alt="Code Thinking"
              className={homeStyles.graphicsMobile}
            />
          </div>
          <div className={homeStyles.introTextMobile}>
            <div className={homeStyles.subtitleMobile}>
              A new way to practice coding
            </div>
            <div className={homeStyles.textBlockMobile}>
              Gone are the days of tedious exercises and repetitive drills. Our
              platform offers a fun and engaging way to sharpen your coding
              skills through exciting coding challenges and competitions. With
              our innovative approach, you'll be able to improve your coding
              abilities while enjoying the thrill of friendly competition. Join
              us today and discover a whole new world of coding practice!
            </div>
          </div>
        </MediaQuery>
      </div>
      <div id={homeStyles.feature}>
        <MediaQuery minWidth={1090}>
          <Row>
            <Col md={{ span: 6, offset: 1 }}>
              <div className={homeStyles.introText}>
                <div className={homeStyles.subtitle}>
                  Compete in real time against users
                </div>
                <div className={homeStyles.textBlock}>
                  Are you ready for the ultimate coding challenge? Our coding
                  competition site offers a unique opportunity to compete in
                  real-time against your friends! With our state-of-the-art
                  platform, you'll be able to test your coding skills and
                  strategy under pressure, as you compete head-to-head against
                  other talented programmers you know.
                </div>
              </div>
            </Col>
            <Col md={{ span: 4 }}>
              <div className={homeStyles.graphicsBoxMobile}>
                <img
                  src={codeTyping}
                  alt="Code Typing"
                  className={homeStyles.graphics}
                />
              </div>
            </Col>
          </Row>
        </MediaQuery>
        <MediaQuery maxWidth={1089}>
          <div className={homeStyles.introTextMobile}>
            <div className={homeStyles.subtitleMobile}>
              Compete in real time against users
            </div>
            <div className={homeStyles.textBlockMobile}>
              Are you ready for the ultimate coding challenge? Our coding
              competition site offers a unique opportunity to compete in
              real-time against your friends! With our state-of-the-art
              platform, you'll be able to test your coding skills and strategy
              under pressure, as you compete head-to-head against other talented
              programmers you know.
            </div>
          </div>
          <div className={homeStyles.graphicsBoxMobile}>
            <img
              src={codeTyping}
              alt="Code Typing"
              className={homeStyles.graphicsMobile}
            />
          </div>
        </MediaQuery>
      </div>
      <div id={homeStyles.techFeature}>
        <MediaQuery minWidth={1090}>
          <Row>
            <Col md={{ span: 4 }}>
              <div className={homeStyles.introText}>
                <div className={homeStyles.subtitle}>
                  Compete in popular languages
                </div>
                <div className={homeStyles.textBlock}>
                  Are you a Java guru or a Python mastermind? Our coding
                  competition site offers challenges and competitions in popular
                  programming languages like Java, Python, C, and more, allowing
                  you to showcase your skills in the language of your choice.
                </div>
              </div>
            </Col>
            <Col md={{ span: 4 }}>
              <img
                src={hackerMindset}
                alt="Hacker Mindset"
                className={homeStyles.graphics}
              />
            </Col>
            <Col md={{ span: 4 }}>
              <div className={homeStyles.introText}>
                <div className={homeStyles.subtitle}>Win award badges</div>
                <div className={homeStyles.textBlock}>
                  Winning is not just about bragging rights. Our platform offers
                  a variety of badges and awards to recognize your achievements
                  and progress as a coder. From beginner to expert levels, our
                  badges provide a tangible way to track your growth and show
                  off your coding skills to the world.
                </div>
              </div>
            </Col>
          </Row>
        </MediaQuery>
        <MediaQuery maxWidth={1089}>
          <div className={homeStyles.introTextMobile}>
            <div className={homeStyles.subtitleMobile}>
              Compete in popular languages
            </div>
            <div className={homeStyles.textBlockMobile}>
              Are you a Java guru or a Python mastermind? Our coding competition
              site offers challenges and competitions in popular programming
              languages like Java, Python, C, and more, allowing you to showcase
              your skills in the language of your choice.
            </div>
          </div>
          <div className={homeStyles.graphicsBoxMobile}>
            <img
              src={hackerMindset}
              alt="Hacker Mindset"
              className={homeStyles.graphicsMobile}
            />
          </div>

          <div className={homeStyles.introTexMobile}>
            <div className={homeStyles.subtitleMobile}>Win award badges</div>
            <div className={homeStyles.textBlockMobile}>
              Winning is not just about bragging rights. Our platform offers a
              variety of badges and awards to recognize your achievements and
              progress as a coder. From beginner to expert levels, our badges
              provide a tangible way to track your growth and show off your
              coding skills to the world.
            </div>
          </div>
        </MediaQuery>
      </div>
      <About></About>
    </div>
  );
};

export default Home;
