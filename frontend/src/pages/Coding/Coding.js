import React from "react";
import codingStyles from "./Coding.module.css";
import { withAuth0 } from "@auth0/auth0-react";
import Editor from "@monaco-editor/react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Monaco from "../../components/Monaco/Monaco";
import * as problemService from "../../services/api/Problems.js";
import ChatBox from "../../components/ChatBox/ChatBox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import * as userService from "../../services/api/Users.js";
import * as lobbyService from "../../services/api/Lobby.js";

const options = [
  { value: "python", label: "Python3" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "JavaScript" },
  { value: "c", label: "C" },
];
const defaultOption = options[0];

class Coding extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.state = {
      number: props.number,
      name: null,
      description: null,
      difficulty: null,
      language: defaultOption.value,
      solutionCode: "",
      premium: false,
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

    this.updateLanguage = this.updateLanguage.bind(this);
    this.updateSolutionLanguage = this.updateSolutionLanguage.bind(this);

    // problemService.getProblem(this.state.number).then((res) => {
    //   this.setState({
    //     name: res.name,
    //     description: res.description,
    //     difficulty: res.difficulty,
    //   });
    // });
  }

  componentDidMount() {
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
          <Monaco number={number} language={language} />
        </div>
        <div className={codingStyles.rightPane}>
          <div className={codingStyles.infoBox}>{this.props.id}</div>
          <ChatBox />
        </div>
      </div>
    );
  }
}

export default withAuth0(Coding);
