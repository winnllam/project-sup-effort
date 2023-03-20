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
let editorCode = null;

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
      language: defaultOption.value,
      code: "",
      methodName: "",
    };

    this.updateLanguage = this.updateLanguage.bind(this);
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

  saveDesc = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    // TODO: Change to allow edit name + difficulty
    problemService
      .updateProblem(
        this.state.problemId,
        this.state.problemName,
        formJson.desc,
        this.state.difficulty
      )
      .then((res) => {
        this.setState({
          problemName: res.name,
          desc: res.description,
          difficulty: res.difficulty,
        });
      });
  };

  saveCode = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    problemService
      .addStarterCode(
        this.state.problemId,
        this.state.language,
        editorCode?.getValue(),
        formJson.methodName
      )
      .then((res) => {
        console.log(res);
      });
  };

  handleEditorDidMount(editor, monaco) {
    editorCode = editor;
  }

  updateLanguage(language) {
    this.setState({ language: language.value });

    problemService
      .getStarterCode(this.state.problemId, language.value)
      .then((res) => {
        this.setState({ code: res.code, methodName: res.methodName });
      })
      .catch((error) => {
        this.setState({ code: "", methodName: "" });
      });
  }

  render() {
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
                type={Text}
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
          <div class={styles.subtitle}>Problem Description</div>
          <div class={styles.descBox}>
            <form onSubmit={this.saveDesc}>
              <textarea
                id={styles.problemDesc}
                name="desc"
                defaultValue={this.state.desc}
              ></textarea>
              <button class={styles.button} type="submit">
                Save
              </button>
            </form>
          </div>
        </div>

        <div class={styles.starterCode}>
          <div class={styles.subtitle}>Starter Code</div>
          <Dropdown
            options={options}
            onChange={this.updateLanguage}
            defaultValue={defaultOption}
            placeholder="Select a language"
          />
          <div class={styles.codeBox}>
            <form onSubmit={this.saveCode}>
              <Editor
                id={styles.code}
                height={"30vh"}
                width={"100%"}
                language={this.state.language}
                value={this.state.code}
                onMount={this.handleEditorDidMount}
              />
              <input
                type="text"
                id={styles.methodName}
                name="methodName"
                value={this.state.methodName}
                onChange={(e) => {
                  this.setState({ methodName: e.target.value });
                }}
              ></input>
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
