import React from "react";
import codingStyles from "./Coding.module.css";
import { withAuth0 } from "@auth0/auth0-react";
import Monaco from "../../components/Monaco/Monaco";
import * as problemService from "../../services/api/Problems.js";

class Coding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: null,
      name: null,
      description: null,
      difficulty: null,
    };

    problemService.getProblem(1).then((res) => {
      this.setState({
        number: res.number,
        name: res.name,
        description: res.description,
        difficulty: res.difficulty,
      });
    });
  }

  render() {
    const { number, name, description, difficulty } = this.state;

    return (
      <div className={codingStyles.coding}>
        <div className={codingStyles.leftPane}>
          <div className={codingStyles.subtitle}>
            {number}. {name}
          </div>
          <div>{difficulty}</div>
          <div>{description}</div>
        </div>

        <div className={codingStyles.rightPane}>
          <Monaco number={number} />
        </div>
      </div>
    );
  }
}

export default withAuth0(Coding);
