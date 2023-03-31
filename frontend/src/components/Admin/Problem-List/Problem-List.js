import React from "react";
import Edit from "../Edit/Edit";
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
    return (
      <div className={styles.problems}>
        <Modal
          show={this.state.newProblem}
          onHide={this.closeNewProblemModal}
          class={styles.editModal}
        >
          <form onSubmit={this.addNewProblem}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Problem</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
              <Button variant="secondary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
        {this.state.problemId === null && (
          <div id={styles.screen}>
            <div class={styles.title}>Problems</div>
            <div id={styles.newProblem}>
              <button
                class={styles.button}
                id={styles.new}
                onClick={this.openNewProblemModal}
              >
                New Problem
              </button>
            </div>
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
                  <button class={styles.button}>
                    <Link
                      to={"/dashboard/admin/problems/" + problem.number}
                      class={styles.options}
                    >
                      Edit
                    </Link>
                  </button>
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
