import React from "react";
import problemStyles from "./Problems.module.css";
import * as problemService from "../../services/api/Problems.js";

class Problems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      problems: [],
    };

    problemService.getProblems().then((res) => {
      this.setState({ problems: res });
    });
  }

  render() {
    const { problems } = this.state;

    let problemList = problems.map((problem) => (
      <div
        className={`${problemStyles.problem}
            ${problem.difficulty === "easy" ? problemStyles.easy : ""} 
            ${problem.difficulty === "medium" ? problemStyles.medium : ""} 
            ${problem.difficulty === "hard" ? problemStyles.hard : ""}`}
        key={problem.number}
      >
        <div className={problemStyles.info}>
          <h2>
            {problem.number}. {problem.name}
          </h2>
          <p>{problem.description}</p>
        </div>
      </div>
    ));

    return (
      <div className={problemStyles.problems}>
        <div id={problemStyles.header}>Problem Catalog</div>
        {problemList}
      </div>
    );
  }
}

export default Problems;
