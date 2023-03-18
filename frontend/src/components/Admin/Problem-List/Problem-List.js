import React from "react";
import Edit from "../Edit/Edit";
import styles from "./Problem-List.module.css";

class ProblemList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      problemId: null,
      problems: [],
    };

    for (let i = 0; i < 10; i++) {
      this.state.problems.push({
        id: i,
        desc: "Desc",
        name: "FizzBuzz",
      });
    }
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
                    {problem.id} : {problem.name}
                  </b>
                </div>
                <div class={styles.problemDesc}>
                  <i> {problem.desc}</i>
                </div>
                <div class={styles.editProblem}>
                  <button
                    class={styles.button}
                    onClick={() => this.setState({ problemId: problem.id })}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
            ;
          </div>
        )}
        ;{this.state.problemId !== null && <Edit />}
      </div>
    );
  }
}

export default ProblemList;
