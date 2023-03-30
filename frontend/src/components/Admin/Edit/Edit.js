import React from "react";
import styles from "./Edit.module.css";
import Editor from "@monaco-editor/react";
import Dropdown from "react-dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TestCase from "../Test-Case/Test-Case";
import { Modal, Button } from "react-bootstrap";
import * as problemService from "../../../services/api/Problems.js";

const options = [
  { value: "python", label: "Python3" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "JavaScript" },
  { value: "c", label: "C" },
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
      desc: "",
      difficulty: "",
      starterLanguage: defaultOption.value,
      solutionLanguage: defaultOption.value,
      starterCode: "",
      solutionCode: "",
      methodName: "",
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
    problemService.getTestCases(this.state.problemId).then((res) => {
      this.setState({
        testsList: res.test,
      });
    });
  }

  openNewTestModal = () => this.setState({ newTest: true });

  closeNewTestModal = () => this.setState({ newTest: false });

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

    problemService
      .addStarterCode(
        this.state.problemId,
        this.state.starterLanguage,
        starterEditorCode?.getValue(),
        formJson.methodName
      )
      .then((res) => {
        console.log(res);
      });
  };

  saveSolutionCode = (e) => {
    e.preventDefault();

    problemService
      .addSolutionCode(
        this.state.problemId,
        this.state.solutionLanguage,
        solutionEditorCode?.getValue()
      )
      .then((res) => {
        console.log(res);
      });
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
    const { difficulty, problemName } = this.state;
    return (
      <div className={styles.problem}>
        <Modal
          show={this.state.newTest}
          onHide={this.closeNewTestModal}
          class={styles.editModal}
        >
          <form onSubmit={this.saveNewTestModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Test Case</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div class={styles.modalTitle}>Input</div>
              <input
                type={String}
                placeholder={"Expected input"}
                class={styles.inputBox}
                name="input"
              ></input>
              <div class={styles.modalTitle}>Output</div>
              <input
                type={Text}
                placeholder={"Expected output"}
                class={styles.inputBox}
                name="output"
              ></input>{" "}
              <div class={styles.modalTitle}>Description</div>
              <input
                type={Text}
                placeholder={"Optional"}
                class={styles.inputBox}
                name="desc"
              ></input>{" "}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
        <div class={styles.title}>{this.state.problemName}</div>

        <div class={styles.desc}>
          <div class={styles.subtitle}>Problem Details</div>
          <div class={styles.details}>
            <form onSubmit={this.updateProblem}>
              <div class={styles.problemName}>
                <div class={styles.category}>Name</div>
                <input
                  type={String}
                  defaultValue={problemName}
                  class={styles.nameInput}
                  name="name"
                ></input>
              </div>
              <div class={styles.problemDesc}>
                <div class={styles.category}>Description</div>
                <textarea
                  id={styles.problemDesc}
                  name="desc"
                  defaultValue={this.state.desc}
                ></textarea>
              </div>
              <div class={styles.problemDifficulty}>
                <div class={styles.category}>Difficulty</div>
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
              <button class={styles.button} type="submit">
                Save
              </button>
            </form>
          </div>
        </div>

        <div class={styles.code}>
          <div class={styles.subtitle}>Starter Code</div>
          <Dropdown
            options={options}
            onChange={this.updateStarterLanguage}
            defaultValue={defaultOption}
            placeholder="Select a language"
          />
          <div class={styles.codeBox}>
            <form onSubmit={this.saveStarterCode}>
              <Editor
                id={styles.code}
                height={"30vh"}
                width={"100%"}
                language={this.state.starterLanguage}
                value={this.state.starterCode}
                onMount={this.handleStarterEditorDidMount}
              />
              <div class={styles.category}>Method Name</div>
              <input
                type="text"
                id={styles.methodName}
                name="methodName"
                placeholder={"Method Name"}
                value={this.state.methodName}
                onChange={(e) => {
                  this.setState({ methodName: e.target.value });
                }}
              ></input>
              <button class={styles.button}>Save</button>
            </form>
          </div>
        </div>

        <div class={styles.code}>
          <div class={styles.subtitle}>Sample Solution Code</div>
          <Dropdown
            options={options}
            onChange={this.updateSolutionLanguage}
            defaultValue={defaultOption}
            placeholder="Select a language"
          />
          <div class={styles.codeBox}>
            <form onSubmit={this.saveSolutionCode}>
              <Editor
                height={"30vh"}
                width={"100%"}
                language={this.state.solutionLanguage}
                value={this.state.solutionCode}
                onMount={this.handleSolutionEditorDidMount}
              />
              <button class={styles.button}>Save</button>
            </form>
          </div>
        </div>

        <div class={styles.tests}>
          <Row>
            <Col md={10}>
              <div class={styles.subtitle}>Test Cases</div>
            </Col>
            <Col md={2}>
              <div class={styles.newTest}>
                <button
                  class={styles.button}
                  id={styles.new}
                  onClick={this.openNewTestModal}
                >
                  New
                </button>
              </div>
            </Col>
          </Row>

          <div class={styles.testsBox}>
            {" "}
            {this.state.testsList.length > 0 && (
              <TestCase
                testsList={this.state.testsList}
                problemId={this.state.problemId}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
