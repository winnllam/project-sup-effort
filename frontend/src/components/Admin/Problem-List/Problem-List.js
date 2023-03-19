import React from "react";
import Edit from "../Edit/Edit";
import styles from "./Problem-List.module.css";
import * as problemService from "../../../services/api/Problems.js";

class ProblemList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      problemId: null,
      problems: [],
    };
  }

  componentDidMount() {
    problemService.getProblems().then((res) => {
      this.setState({ problems: res });
    });
  }

  render() {
    return (
      <div className={styles.problems}>
        {this.state.problemId === null && (
          <div id={styles.screen}>
            <div class={styles.title}>Problems</div>
            {this.state.problems.map((problem) => (
              <div class={styles.problem}>
                <div class={styles.problemName}>
                  <b>
                    {problem.number} : {problem.name}
                  </b>
                </div>
                <div class={styles.problemDesc}>
                  <i> {problem.description}</i>
                </div>
                <div class={styles.editProblem}>
                  <button
                    class={styles.button}
                    onClick={() => this.setState({ problemId: problem.number })}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {this.state.problemId !== null && (
          <Edit problemId={this.state.problemId} />
        )}
      </div>
    );
  }
}

export default ProblemList;
