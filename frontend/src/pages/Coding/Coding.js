import React from "react";
import codingStyles from "./Coding.module.css";
import { withAuth0 } from "@auth0/auth0-react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Monaco from "../../components/Monaco/Monaco";
import * as problemService from "../../services/api/Problems.js";

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
          <Monaco number={number} language={language} />
        </div>

        <div className={codingStyles.rightPane}>
          <Dropdown
            options={options}
            onChange={this.updateLanguage}
            value={defaultOption}
            placeholder="Select a language"
          />
          <Monaco number={number} language={language} />
        </div>
      </div>
    );
  }
}

export default withAuth0(Coding);
