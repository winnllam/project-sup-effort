import React from "react";
import styles from "./Problem-List.module.css";
import { Modal } from "react-bootstrap";
import * as problemService from "../../../services/api/Problems.js";
import { HashLink as Link } from "react-router-hash-link";

class ProblemList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      problemId: null,
      problems: [],
      newProblem: false,
      total: 0,
      page: 0,
      limit: 10,
    };
  }

  componentDidMount() {
    problemService
      .getProblems(this.state.page, this.state.limit)
      .then((res) => {
        this.setState({ problems: res.problems, total: res.total });
      });
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      problemService
        .getProblems(this.state.page, this.state.limit)
        .then((res) => {
          this.setState({
            problems: res.problems,
            total: res.total,
          });
        });
    });
  };

  prevPage = () => {
    this.setState({ page: this.state.page - 1 }, () => {
      problemService
        .getProblems(this.state.page, this.state.limit)
        .then((res) => {
          this.setState({
            problems: res.problems,
            total: res.total,
          });
        });
    });
  };

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
    const { problems, newProblem, problemId, page, limit, total } = this.state;

    let problemList = problems.map((problem) => (
      <div className={styles.problem}>
        <div className={styles.problemName}>
          <b>
            {problem.number} : {problem.name}
          </b>
        </div>
        <div className={styles.problemDesc}>
          <i> {problem.description}</i>
        </div>
        <div className={styles.editProblem}>
          <Link
            to={"/dashboard/admin/problems/" + problem.number}
            className={styles.options}
          >
            <button className={styles.button}>Edit</button>
          </Link>
        </div>
      </div>
    ));

    return (
      <div className={styles.problems}>
        <Modal
          show={newProblem}
          onHide={this.closeNewProblemModal}
          className={styles.editModal}
        >
          <form onSubmit={this.addNewProblem}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Problem</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
              <div className={styles.modalTitle}>Name</div>
              <input
                type={Text}
                placeholder={"Problem Name"}
                className={styles.inputBox}
                name="name"
              ></input>
              <div className={styles.modalTitle}>Description</div>
              <input
                type={Text}
                placeholder={"Problem Description"}
                className={styles.inputBox}
                name="desc"
              ></input>{" "}
              <div className={styles.modalTitle}>Difficulty</div>
              <select name="difficulty" id={styles.difficulty}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </Modal.Body>
            <Modal.Footer>
              <button className={styles.saveButton} type="submit">
                Save
              </button>
            </Modal.Footer>
          </form>
        </Modal>
        {problemId === null && (
          <div id={styles.screen}>
            <div className={styles.title}>Problems</div>
            <div id={styles.newProblem}>
              <button
                className={styles.newButton}
                id={styles.new}
                onClick={this.openNewProblemModal}
              >
                New Problem
              </button>
            </div>
            <div>
              {problemList.length > 0 && <div>{problemList}</div>}
              {page > 0 && (
                <button
                  className={styles.button}
                  id={styles.prevButton}
                  onClick={this.prevPage}
                >
                  Previous
                </button>
              )}
              {total - page * limit > limit && (
                <button
                  className={styles.button}
                  id={styles.nextButton}
                  onClick={this.nextPage}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProblemList;
