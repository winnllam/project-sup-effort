import React from "react";
import styles from "./Problem.module.css";

class Problem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.problems}>
        <div class={styles.title}>Problems</div>
        <div class={styles.problem}>
          <div class={styles.problemName}>
            <b>Fizzbuzz</b>
          </div>
          <div class={styles.problemDesc}>
            <i> Problem Description</i>
          </div>
          <div class={styles.editProblem}>
            <button class={styles.button}>Edit</button>
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
            <button class={styles.button}>Edit</button>
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
            <button class={styles.button}>Edit</button>
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
            <button class={styles.button}>Edit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProblemList;
