import React from "react";
import styles from "./Edit.module.css";
import Editor from "@monaco-editor/react";
import Dropdown from "react-dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TestCase from "../Test-Case/Test-Case";
import { Modal } from "react-bootstrap";
import * as problemService from "../../../services/api/Problems.js";

const options = [
  { value: "python", label: "Python3" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "JavaScript" },
];
const defaultOption = options[0];
let starterEditorCode = null;
let solutionEditorCode = null;

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      problemId: props.problemId,
      problemName: "",
      newTest: false,
      testsList: [],
      totalTests: 0,
      desc: "",
      difficulty: "",
      starterLanguage: defaultOption.value,
      solutionLanguage: defaultOption.value,
      starterCode: "",
      solutionCode: "",
      methodName: "",
      page: 0,
      limit: 10,
    };

    this.updateStarterLanguage = this.updateStarterLanguage.bind(this);
    this.updateSolutionLanguage = this.updateSolutionLanguage.bind(this);
  }

  componentDidMount() {
    problemService.getProblem(this.state.problemId).then((res) => {
      this.setState({
        problemName: res.name,
        desc: res.description,
        difficulty: res.difficulty,
      });
    });
    problemService
      .getTestCases(this.state.problemId, this.state.page, this.state.limit)
      .then((res) => {
        this.setState({
          testsList: res.test,
          totalTests: res.total,
        });
      });
  }

  openNewTestModal = () => this.setState({ newTest: true });

  closeNewTestModal = () => this.setState({ newTest: false });

  nextPage = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      problemService
        .getTestCases(this.state.problemId, this.state.page, this.state.limit)
        .then((res) => {
          this.setState({
            testsList: res.test,
            totalTests: res.total,
          });
        });
    });
  };

  prevPage = () => {
    this.setState({ page: this.state.page - 1 }, () => {
      problemService
        .getTestCases(this.state.problemId, this.state.page, this.state.limit)
        .then((res) => {
          this.setState({
            testsList: res.test,
            totalTests: res.total,
          });
        });
    });
  };

  saveNewTestModal = (e) => {
    this.setState({ newTest: false });
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    problemService
      .addTest(this.state.problemId, formJson.input, formJson.output)
      .then((res) => {
        this.setState(() => ({
          testsList: res.problem.testCases,
        }));
      });
  };

  updateProblem = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    problemService
      .updateProblem(
        this.state.problemId,
        formJson.name,
        formJson.desc,
        formJson.difficulty
      )
      .then((res) => {
        this.setState({
          problemName: res.name,
          desc: res.description,
          difficulty: res.difficulty,
        });
      });
  };

  saveStarterCode = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    problemService.addStarterCode(
      this.state.problemId,
      this.state.starterLanguage,
      starterEditorCode?.getValue(),
      formJson.methodName
    );
  };

  saveSolutionCode = (e) => {
    e.preventDefault();

    problemService.addSolutionCode(
      this.state.problemId,
      this.state.solutionLanguage,
      solutionEditorCode?.getValue()
    );
  };

  handleStarterEditorDidMount(editor, monaco) {
    starterEditorCode = editor;
  }

  handleSolutionEditorDidMount(editor, monaco) {
    solutionEditorCode = editor;
  }

  updateStarterLanguage(language) {
    this.setState({ starterLanguage: language.value });

    problemService
      .getStarterCode(this.state.problemId, language.value)
      .then((res) => {
        this.setState({ starterCode: res.code, methodName: res.methodName });
      })
      .catch((error) => {
        this.setState({ starterCode: "", methodName: "" });
      });
  }

  updateSolutionLanguage(language) {
    this.setState({ solutionLanguage: language.value });

    problemService
      .getSolutionCode(this.state.problemId, language.value)
      .then((res) => {
        this.setState({ solutionCode: res.code });
      })
      .catch((error) => {
        this.setState({ solutionCode: "" });
      });
  }

  handleChange = (e) => {
    const total = e.target.value === "Monthly" ? 999 : 9999;
    this.setState({ upgradeType: e.target.value, upgradeTotal: total });
  };

  render() {
    const {
      difficulty,
      problemName,
      newTest,
      desc,
      starterLanguage,
      starterCode,
      methodName,
      solutionLanguage,
      solutionCode,
      testsList,
      problemId,
      page,
      limit,
      totalTests,
    } = this.state;
    return (
      <div className={styles.page}>
        <div className={styles.problem}>
          <Modal
            show={newTest}
            onHide={this.closeNewTestModal}
            class={styles.editModal}
          >
            <form onSubmit={this.saveNewTestModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Test Case</Modal.Title>
              </Modal.Header>
              <Modal.Body className={styles.modalBody}>
                <div className={styles.modalTitle}>Input</div>
                <input
                  type={String}
                  placeholder={"Expected input"}
                  className={styles.inputBox}
                  name="input"
                ></input>
                <div className={styles.modalTitle}>Output</div>
                <input
                  type={Text}
                  placeholder={"Expected output"}
                  className={styles.inputBox}
                  name="output"
                ></input>{" "}
                <div className={styles.modalTitle}>Description</div>
                <input
                  type={Text}
                  placeholder={"Optional"}
                  className={styles.inputBox}
                  name="desc"
                ></input>{" "}
              </Modal.Body>
              <Modal.Footer>
                <button className={styles.saveButton} type="submit">
                  Save
                </button>
              </Modal.Footer>
            </form>
          </Modal>
          <div className={styles.title}>{problemName}</div>

          <div className={styles.desc}>
            <div className={styles.subtitle}>Problem Details</div>
            <div className={styles.details}>
              <form onSubmit={this.updateProblem}>
                <div className={styles.problemName}>
                  <div className={styles.category}>Name</div>
                  <input
                    type={String}
                    defaultValue={problemName}
                    className={styles.nameInput}
                    name="name"
                  ></input>
                </div>
                <div className={styles.problemDesc}>
                  <div className={styles.category}>Description</div>
                  <textarea
                    id={styles.problemDesc}
                    name="desc"
                    defaultValue={desc}
                  ></textarea>
                </div>
                <div className={styles.problemDifficulty}>
                  <div className={styles.category}>Difficulty</div>
                  <select
                    id={styles.options}
                    name="difficulty"
                    defaultValue={difficulty}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <br />
                <button className={styles.button} type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>

          <div className={styles.code}>
            <div className={styles.subtitle}>Starter Code</div>
            <Dropdown
              options={options}
              onChange={this.updateStarterLanguage}
              defaultValue={defaultOption}
              placeholder="Select a language"
            />
            <div className={styles.codeBox}>
              <form onSubmit={this.saveStarterCode}>
                <Editor
                  id={styles.code}
                  height={"30vh"}
                  width={"100%"}
                  language={starterLanguage}
                  value={starterCode}
                  onMount={this.handleStarterEditorDidMount}
                />
                <div className={styles.category}>Method Name</div>
                <input
                  type="text"
                  id={styles.methodName}
                  name="methodName"
                  placeholder={"Method Name"}
                  value={methodName}
                  onChange={(e) => {
                    this.setState({ methodName: e.target.value });
                  }}
                ></input>
                <button className={styles.button}>Save</button>
              </form>
            </div>
          </div>

          <div className={styles.code}>
            <div className={styles.subtitle}>Sample Solution Code</div>
            <Dropdown
              options={options}
              onChange={this.updateSolutionLanguage}
              defaultValue={defaultOption}
              placeholder="Select a language"
            />
            <div className={styles.codeBox}>
              <form onSubmit={this.saveSolutionCode}>
                <Editor
                  height={"30vh"}
                  width={"100%"}
                  language={solutionLanguage}
                  value={solutionCode}
                  onMount={this.handleSolutionEditorDidMount}
                />
                <button className={styles.button}>Save</button>
              </form>
            </div>
          </div>

          <div className={styles.tests}>
            <Row>
              <Col md={10}>
                <div className={styles.subtitle}>Test Cases</div>
              </Col>
              <Col md={2}>
                <div className={styles.newTest}>
                  <button
                    className={styles.newButton}
                    id={styles.new}
                    onClick={this.openNewTestModal}
                  >
                    New
                  </button>
                </div>
              </Col>
            </Row>

            <div className={styles.testsBox}>
              {testsList.length > 0 && (
                <TestCase testsList={testsList} problemId={problemId} />
              )}
              {page > 0 && (
                <button
                  className={styles.button}
                  id={styles.prevButton}
                  onClick={this.prevPage}
                >
                  Previous
                </button>
              )}
              {totalTests - page * limit > limit && (
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
        </div>
      </div>
    );
  }
}

export default Edit;
