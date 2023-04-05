import React from "react";
import codingStyles from "./Coding.module.css";
import { withAuth0 } from "@auth0/auth0-react";
import Editor from "@monaco-editor/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import MonacoTabs from "../../components/Monaco/MonacoTabs";
import * as problemService from "../../services/api/Problems.js";
import ChatBox from "../../components/ChatBox/ChatBox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import * as userService from "../../services/api/Users.js";
import * as lobbyService from "../../services/api/Lobbies.js";
import * as emailService from "../../services/api/Emails.js";

const options = [
  { value: "python", label: "Python3" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "JavaScript" },
];
const defaultOption = options[0];

class Coding extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props.auth0;
    this.id = props.id;

    this.state = {
      id: props.id,
      number: props.number,
      name: null,
      description: null,
      difficulty: null,
      language: defaultOption.value,
      solutionCode: "",
      premium: false,
      email: "",
      userName: user.nickname,
    };

    lobbyService.getLobby(props.id).then((res) => {
      this.setState({ number: res.problem });

      problemService.getProblem(res.problem).then((problem) => {
        this.setState({
          name: problem.name,
          description: problem.description,
          difficulty: problem.difficulty,
        });
      });
    });

    this.updateEmail = this.updateEmail.bind(this);
    this.sendCompetitionInvite = this.sendCompetitionInvite.bind(this);
    this.updateLanguage = this.updateLanguage.bind(this);
    this.updateSolutionLanguage = this.updateSolutionLanguage.bind(this);
  }

  componentDidMount() {
    lobbyService
      .joinLobby(this.props.id, this.state.userName)
      .then((res) => {});
    userService.getMe().then((res) => {
      this.setState({
        premium: res.premium.status === "Active",
      });
    });
  }

  updateLanguage(language) {
    this.setState({ language: language.value });
  }

  updateSolutionLanguage(language) {
    this.setState({ solutionLanguage: language.value });

    problemService
      .getSolutionCode(this.state.number, language.value)
      .then((res) => {
        this.setState({ solutionCode: res.code });
      })
      .catch((error) => {
        this.setState({ solutionCode: "No solution in this language" });
      });
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }

  sendCompetitionInvite() {
    const url =
      process.env.REACT_APP_PRODUCTION_URL + "/coding/" + this.state.id;
    const subject = "Competition Invite";
    const text =
      "Hello! " +
      this.state.userName +
      " is challenging you to a coding competition! Click here to join!" +
      "Or, copy and paste this link to join: " +
      url;
    const html =
      "<p>Hello!</p> <p><b>" +
      this.state.userName +
      '</b> is challenging you to a coding competition! Click <a href="' +
      url +
      '">here</a> to join!</p>' +
      "<p>Or, copy and paste this link to join: " +
      url +
      "</p>";
    emailService.sendEmail(this.state.email, subject, text, html);
  }

  render() {
    const { number, name, description, difficulty, language, premium } =
      this.state;

    return (
      <div className={codingStyles.coding}>
        <div className={codingStyles.leftPane}>
          <Tabs>
            <div class={codingStyles.tabs}>
              <TabList>
                <Tab>Problem</Tab>
                {premium && <Tab>Solution</Tab>}
              </TabList>
            </div>
            <TabPanel>
              <div className={codingStyles.subtitle}>
                {number}. {name}
              </div>
              <div>{difficulty}</div>
              <div>{description}</div>
            </TabPanel>
            <TabPanel>
              <Dropdown
                options={options}
                onChange={this.updateSolutionLanguage}
                defaultValue={defaultOption}
                placeholder="Select a language"
              />
              <div class={codingStyles.codeBox}>
                <Editor
                  height={"30vh"}
                  width={"100%"}
                  language={this.state.solutionLanguage}
                  value={this.state.solutionCode}
                  onMount={this.handleSolutionEditorDidMount}
                  options={{ readOnly: true }}
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>

        <div className={codingStyles.middlePane}>
          <Dropdown
            options={options}
            onChange={this.updateLanguage}
            value={defaultOption}
            placeholder="Select a language"
          />
          <MonacoTabs
            number={number}
            language={language}
            lobby={this.props.id}
            user={this.state.userName}
          />
        </div>
        <div className={codingStyles.rightPane}>
          <div className={codingStyles.infoBox}>
            <div className={codingStyles.lobbyInfo}>
              <div className={codingStyles.subtitle}>Lobby</div>
              {this.props.id}
              <hr></hr>
            </div>
            <input
              type="text"
              className={codingStyles.emailInviteInput}
              name="invite"
              placeholder="Enter email"
              onChange={this.updateEmail}
            ></input>
            <button
              className={codingStyles.sendBtn}
              onClick={this.sendCompetitionInvite}
            >
              Send Invite
            </button>
          </div>

          <ChatBox lobby={this.props.id} />
        </div>
      </div>
    );
  }
}

export default withAuth0(Coding);
