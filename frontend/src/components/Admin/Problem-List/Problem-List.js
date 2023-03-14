import React from "react";
import Edit from "../Edit/Edit";
import styles from "./Problem-List.module.css";

class ProblemList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      problemId: null,
    };
  }

  render() {
    return (
      <div className={styles.problems}>
        {this.state.problemId === null && (
          <div id={styles.screen}>
            <div class={styles.title}>Problems</div>
            <div class={styles.problem}>
              <div class={styles.problemName}>
                <b>Fizzbuzz</b>
              </div>
              <div class={styles.problemDesc}>
                <i> Problem Description</i>
              </div>
              <div class={styles.editProblem}>
                <button
                  class={styles.button}
                  onClick={() => this.setState({ problemId: 5 })}
                >
                  Edit
                </button>
              </div>
            </div>

            <div class={styles.problem}>
              <div class={styles.problemName}>
                <b>Fizzbuzz</b>
              </div>
              <div class={styles.problemDesc}>
                <i> Problem Description</i>
              </div>
              <div class={styles.editProblem}>
                <button
                  class={styles.button}
                  onClick={() => this.setState({ problemId: 5 })}
                >
                  Edit
                </button>
              </div>
            </div>

            <div class={styles.problem}>
              <div class={styles.problemName}>
                <b>Fizzbuzz</b>
              </div>
              <div class={styles.problemDesc}>
                <i> Problem Description</i>
              </div>
              <div class={styles.editProblem}>
                <button
                  class={styles.button}
                  onClick={() => this.setState({ problemId: 5 })}
                >
                  Edit
                </button>
              </div>
            </div>

            <div class={styles.problem}>
              <div class={styles.problemName}>
                <b>Fizzbuzz</b>
              </div>
              <div class={styles.problemDesc}>
                <i> Problem Description</i>
              </div>
              <div class={styles.editProblem}>
                <button
                  class={styles.button}
                  onClick={() => this.setState({ problemId: 5 })}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
        {this.state.problemId !== null && <Edit />}
      </div>
    );
  }
}

export default ProblemList;
