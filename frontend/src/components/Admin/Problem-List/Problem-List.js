import React from "react";
import styles from "./Problem-List.module.css";
import { Modal, Button } from "react-bootstrap";
import * as problemService from "../../../services/api/Problems.js";
import { HashLink as Link } from "react-router-hash-link";

class ProblemList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      problemId: null,
      problems: [],
      newProblem: false,
    };
  }

  componentDidMount() {
    problemService.getProblems().then((res) => {
      this.setState({ problems: res });
    });
  }

  openNewProblemModal = () => this.setState({ newProblem: true });

  closeNewProblemModal = () => this.setState({ newProblem: false });

  addNewProblem = (e) => {
    this.setState({ newProblem: false });
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    problemService
      .addProblem(formJson.name, formJson.desc, formJson.difficulty)
      .then((res) => {
        const newList = this.state.problems;
        newList.push(res.problem);
        this.setState(() => ({
          problems: newList,
        }));
      });
  };

  render() {
    const { problems, newProblem, problemId } = this.state;
    return (
      <div className={styles.problems}>
        <Modal
          show={newProblem}
          onHide={this.closeNewProblemModal}
          class={styles.editModal}
        >
          <form onSubmit={this.addNewProblem}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Problem</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
              <div class={styles.modalTitle}>Name</div>
              <input
                type={Text}
                placeholder={"Problem Name"}
                class={styles.inputBox}
                name="name"
              ></input>
              <div class={styles.modalTitle}>Description</div>
              <input
                type={Text}
                placeholder={"Problem Description"}
                class={styles.inputBox}
                name="desc"
              ></input>{" "}
              <div class={styles.modalTitle}>Difficulty</div>
              <select name="difficulty" id={styles.difficulty}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </Modal.Body>
            <Modal.Footer>
              <button class={styles.saveButton} type="submit">
                Save
              </button>
            </Modal.Footer>
          </form>
        </Modal>
        {problemId === null && (
          <div id={styles.screen}>
            <div class={styles.title}>Problems</div>
            <div id={styles.newProblem}>
              <button
                class={styles.newButton}
                id={styles.new}
                onClick={this.openNewProblemModal}
              >
                New Problem
              </button>
            </div>
            {problems.map((problem) => (
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
                  <Link
                    to={"/dashboard/admin/problems/" + problem.number}
                    class={styles.options}
                  >
                    <button class={styles.button}>Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ProblemList;
