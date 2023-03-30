import React from "react";
import Editor from "@monaco-editor/react";
import monacoStyles from "./Monaco.module.css";
import * as compilerService from "../../services/api/JDoodle.js";
import * as problemService from "../../services/api/Problems.js";
import { io } from "socket.io-client";
import getLobbyName from "../../lobby/lobbyName";


// const height = "90vh";
const width = "100%";
let language = "";

let editorCode = null;
class Monaco extends React.Component {
  constructor(props) {
    super(props);
    this.prevValue = "";
    this.socket = io("http://localhost:9000");
    this.state = {
      number: null,
      code: null,
      methodName: null,
      height: "80vh",
      results: [],
      showResults: false,
    };
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.language !== null) {
      language = props.language;
    }
    if (props.number !== null) {
      this.setState({ number: props.number });
      problemService.getStarterCode(props.number, language).then((res) => {
        this.setState({ code: res.code, methodName: res.methodName });
      });
    }
  }

  componentWillMount() {
    console.log(getLobbyName());
    this.socket.on("connect", () => {
      console.log(`Connected to socket server with id ${this.socket.id}`);
    });

    this.socket.on("receive-code", (id, code) => {
        this.prevValue = code;
        this.setState(() => {
          return {
            code: code,
          };
      });
    });
  }

  shouldComponentUpdate(nextState) {
    return this.state !== nextState;
  }

  handleEditorDidMount(editor, monaco) {
    editorCode = editor;
  }

  runPython(total, tests) {
    let addTests = editorCode?.getValue();
    console.log(addTests);
    addTests = addTests.concat("\r\npassCounter = 0");

    for (let i = 0; i < total; i++) {
      // what the function call looks like using the test input
      const functionCall = this.state.methodName + "(" + tests[i].input + ")";
      // calling the function and save results
      addTests = addTests.concat(
        "\r\ntestCallResult = str(" + functionCall + ")"
      );
      // print out info line about pass/fail
      addTests = addTests.concat(
        "\r\nprint('Expected: " +
          tests[i].output +
          "; Actual: ' + testCallResult + '; Pass: ', str(" +
          tests[i].output +
          ") == testCallResult)"
      );
      // increase pass counter if passed
      addTests = addTests.concat(
        "\r\nif str(" +
          tests[i].output +
          ") == testCallResult: passCounter += 1"
      );
    }
    addTests = addTests.concat(
      "\r\nprint('Passed: ' + str(passCounter) + '/" + total + "')"
    );

    console.log(addTests);
    return addTests;
  }

  submit() {
    // TODO: this is for python only right now, need to account for the other languages
    problemService.getTestCases(this.state.number).then((res) => {
      const total = res.total;
      const tests = res.test;

      const addTests = this.runPython(total, tests);

      compilerService.executeCode(addTests, language).then((test) => {
        const result = test.output.split(/\r?\n/);
        this.setState({ height: "45vh", results: result, showResults: true });
      });
    });
  }

  handleEditorChange(value, event) {
    console.log(value === this.prevValue);
    if (value !== this.prevValue) {
      this.socket.emit("send-code",this.socket.id, value);
      this.prevValue = value;
    }
  }

  render() {
    const { code, height, results, showResults } = this.state;
    return (
      <>
        <Editor
          height={height}
          width={width}
          defaultLanguage={language}
          value={code}
          onMount={this.handleEditorDidMount}
          onChange={this.handleEditorChange}
        />
        <button onClick={this.submit}>Submit Code</button>
        {showResults ? (
          <div className={monacoStyles.testResults}>
            {results.map((test) => (
              <p key={test}>{test}</p>
            ))}
          </div>
        ) : null}
      </>
    );
  }
}
export default Monaco;
