import React from "react";
import codingStyles from "./Coding.module.css";
import { withAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Monaco from "../../components/Monaco/Monaco";
import * as problemService from "../../services/api/Problems.js";
import ChatBox from "../../components/ChatBox/ChatBox";

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
    };

    this.updateLanguage = this.updateLanguage.bind(this);

    problemService.getProblem(props.number).then((res) => {
      this.setState({
        name: res.name,
        description: res.description,
        difficulty: res.difficulty,
      });
    });
  }

  shouldComponentUpdate(nextState) {
    // TODO: pretty sure this isnt right...
    return this.state !== nextState;
  }

  updateLanguage(language) {
    this.setState({ language: language.value });
  }

  render() {
    const { number, name, description, difficulty, language } = this.state;
    return (
      <div className={codingStyles.coding}>
        <div className={codingStyles.leftPane}>
          <div className={codingStyles.subtitle}>
            {number}. {name}
          </div>
          <div>{difficulty}</div>
          <div>{description}</div>
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
