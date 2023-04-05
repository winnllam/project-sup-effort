import React from "react";
import Editor from "@monaco-editor/react";
import { MutatingDots } from "react-loader-spinner";
import monacoStyles from "./Monaco.module.css";
import * as compilerService from "../../services/api/JDoodle.js";
import * as problemService from "../../services/api/Problems.js";
import { io } from "socket.io-client";

const width = "100%";
let language = "";

let editorCode = null;
class Monaco extends React.Component {
  constructor(props) {
    super(props);
    this.lobby = this.props.lobby;
    this.user = this.props.user;
    let url = process.env.REACT_APP_BACKEND_LOCALHOST;
    if (process.env.NODE_ENV === "production") {
      url = process.env.REACT_APP_PRODUCTION_URL;
    }
    this.socket = io(url);

    this.state = {
      number: null,
      code: null,
      methodName: "",
      height: "70vh",
      results: [],
      showResults: false,
      setSpinner: false,
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

      // if the language has modified code from previous attempt
      if (sessionStorage.getItem("cur" + language + this.lobby) !== null) {
        // restore the code from storage
        this.setState({
          code: sessionStorage.getItem("cur" + language + this.lobby),
        });
      } else {
        problemService
          .getStarterCode(props.number, language)
          .then((res) => {
            console.log(res);
            this.setState({ code: res.code, methodName: res.methodName });
            sessionStorage.setItem("cur" + language + this.lobby, res.code);
            sessionStorage.setItem(
              language + "MethodName" + this.lobby,
              res.methodName
            );
          })
          .catch((error) => {
            this.setState({ code: "Language not supported!" });
          });
      }
    }
  }

  componentWillMount() {
    this.socket.on("connect", () => {
      this.socket.emit("join-room", this.lobby);
    });
  }

  handleEditorDidMount(editor, monaco) {
    editorCode = editor;
  }

  runPython(total, tests) {
    let addTests = editorCode?.getValue();
    addTests = addTests.concat("\r\npassCounter = 0");

    for (let i = 0; i < total; i++) {
      // what the function call looks like using the test input
      let functionCall;
      let output;
      if (isNaN(parseInt(tests[i].input))) {
        // is not a number
        functionCall = this.state.methodName + '("' + tests[i].input + '")';
        output = '"' + tests[i].output + '"';
      } else {
        functionCall = this.state.methodName + "(" + tests[i].input + ")";
        output = tests[i].output;
      }

      // calling the function and save results
      addTests = addTests.concat(
        "\r\ntestCallResult = str(" + functionCall + ")"
      );
      // print out info line about pass/fail
      addTests = addTests.concat(
        "\r\nprint('Expected: " +
          output +
          "; Actual: ' + testCallResult + '; Pass: ', str(" +
          output +
          ") == testCallResult)"
      );
      // increase pass counter if passed
      addTests = addTests.concat(
        "\r\nif str(" + output + ") == testCallResult: passCounter += 1"
      );
    }
    addTests = addTests.concat(
      "\r\nprint('Passed: ' + str(passCounter) + '/" + total + "')"
    );

    return addTests;
  }

  runJavascript(total, tests) {
    let addTests = editorCode?.getValue();
    addTests = addTests.concat("\r\nlet passCounter = 0;");

    for (let i = 0; i < total; i++) {
      let functionCall;
      let output;
      if (isNaN(parseInt(tests[i].input))) {
        // is not a number
        functionCall = this.state.methodName + '("' + tests[i].input + '")';
        output = "'" + tests[i].output + "'";
      } else {
        functionCall = this.state.methodName + "(" + tests[i].input + ")";
        output = tests[i].output;
      }

      addTests = addTests.concat("\r\ntestCallResult = " + functionCall + ";");
      addTests = addTests.concat(
        '\r\nconsole.log("Expected: ' +
          output +
          '; Actual: " + testCallResult + "; Pass: " + (' +
          output +
          "=== testCallResult));"
      );
      addTests = addTests.concat(
        "\r\nif (" + output + " === testCallResult) { passCounter++; }"
      );
    }

    addTests = addTests.concat(
      '\r\nconsole.log("Passed: " + passCounter + "/' + total + '")'
    );

    return addTests;
  }

  runJava(total, tests) {
    let main =
      "public class mainClass { \r\npublic static void main(String args[]) { \r\nSolution sol = new Solution();";
    main = main.concat("\r\nint passCounter = 0;");
    for (let i = 0; i < total; i++) {
      let functionCall;
      let output;
      if (isNaN(parseInt(tests[i].input))) {
        // is not a number
        functionCall =
          "sol." + this.state.methodName + '("' + tests[i].input + '")';
        output = '"' + tests[i].output + '"';
      } else {
        functionCall =
          "sol." + this.state.methodName + "(" + tests[i].input + ")";
        output = tests[i].output;
      }

      // print out comparisons
      main = main.concat(
        '\r\nSystem.out.println("Expected: ' +
          tests[i].output +
          '; Actual: " + ' +
          functionCall +
          ' + "; Pass: " + (' +
          output +
          " == " +
          functionCall +
          "));"
      );

      // increase counter if test passed
      main = main.concat(
        "\r\nif (" + output + " == " + functionCall + ") { passCounter++; }"
      );
    }

    main = main.concat(
      '\r\nSystem.out.println("Passed: " + passCounter + "/' + total + '");'
    );
    main = main.concat("}}");

    let solutionCode = editorCode?.getValue();
    main = main.concat("\r\n" + solutionCode);
    return main;
  }

  submit() {
    this.setState({ setSpinner: true });
    problemService.getTestCases(this.state.number).then((res) => {
      const total = res.total;
      const tests = res.test;

      let addTests = "";
      if (language === "python") {
        addTests = this.runPython(total, tests);
      } else if (language === "java") {
        addTests = this.runJava(total, tests);
      } else if (language === "javascript") {
        addTests = this.runJavascript(total, tests);
      }
      console.log(addTests);

      compilerService.executeCode(addTests, language).then((test) => {
        const result = test.output.split(/\r?\n/);
        this.setState({
          height: "35vh",
          results: result,
          showResults: true,
          setSpinner: false,
        });
      });
    });
  }

  handleEditorChange(value, event) {
    this.socket.emit(
      "send-code",
      this.socket.id,
      value,
      this.lobby,
      language,
      this.user
    );
    sessionStorage.setItem(
      "cur" + language + this.lobby,
      editorCode?.getValue()
    );
  }

  render() {
    const { code, height, results, showResults, setSpinner } = this.state;
    return (
      <div>
        {setSpinner && (
          <div className={monacoStyles.spinnerOverlay}>
            <div className={monacoStyles.spinner}>
              <MutatingDots
                height="100"
                width="100"
                color="#4fa94d"
                secondaryColor="#4fa94d"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          </div>
        )}
        <Editor
          height={height}
          width={width}
          language={language}
          value={code}
          onMount={this.handleEditorDidMount}
          onChange={this.handleEditorChange}
        />
        {showResults ? (
          <div className={monacoStyles.testResults}>
            <h2>Test Results</h2>
            {results.map((test) => (
              <p key={test}>{test}</p>
            ))}
          </div>
        ) : null}
        <div className={monacoStyles.buttonBar}>
          <button onClick={this.submit} className={monacoStyles.submitBtn}>
            Submit Code
          </button>
        </div>
      </div>
    );
  }
}
export default Monaco;
