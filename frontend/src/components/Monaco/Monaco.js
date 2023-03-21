import React from "react";
import Editor from "@monaco-editor/react";
import monacoStyles from "./Monaco.module.css";
import * as compilerService from "../../services/api/JDoodle.js";
import * as problemService from "../../services/api/Problems.js";

// const height = "90vh";
const width = "100%";
let language = "";

let editorCode = null;
class Monaco extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: null,
      code: null,
      methodName: null,
      height: "80vh",
      results: [],
      showResults: false,
    };

    this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.language !== null) {
      language = props.language;
    }
    if (props.number !== null) {
      this.setState({ number: props.number });
      problemService
        .getStarterCode(props.number, language)
        .then((res) => {
          this.setState({ code: res.code, methodName: res.methodName });
        })
        .catch((error) => {
          this.setState({ code: "Language not supported!" });
        });
    }
  }

  handleEditorDidMount(editor, monaco) {
    editorCode = editor;
  }

  runPython(total, tests) {
    let addTests = editorCode?.getValue();
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

    return addTests;
  }

  runJavascript(total, tests) {
    let addTests = editorCode?.getValue();
    addTests = addTests.concat("let passCounter = 0;");

    for (let i = 0; i < total; i++) {
      const functionCall = this.state.methodName + "(" + tests[i].input + ")";
      addTests = addTests.concat("testCallResult = " + functionCall + ";");
      addTests = addTests.concat(
        'console.log("Expected: ' +
          tests[i].output +
          '; Actual: " + testCallResult + "; Pass: " + (' +
          tests[i].output +
          "=== testCallResult));"
      );
      addTests = addTests.concat(
        "if (" + tests[i].output + " === testCallResult) { passCounter++; }"
      );
    }

    addTests = addTests.concat(
      'console.log("Passed: " + passCounter + "/' + total + '")'
    );

    return addTests;
  }

  runJava(total, tests) {
    let main =
      "public class mainClass { public static void main(String args[]) { Solution sol = new Solution();";
    main = main.concat("int passCounter = 0;");
    for (let i = 0; i < total; i++) {
      const functionCall =
        "sol." + this.state.methodName + "(" + tests[i].input + ")";

      // print out comparisons
      main = main.concat(
        'System.out.println("Expected: ' +
          tests[i].output +
          '; Actual: " + ' +
          functionCall +
          ' + "; Pass: " + (' +
          tests[i].output +
          " == " +
          functionCall +
          "));"
      );

      // increase counter if test passed
      main = main.concat(
        "if (" +
          tests[i].output +
          " == " +
          functionCall +
          ") { passCounter++; }"
      );
    }

    main = main.concat(
      'System.out.println("Passed: " + passCounter + "/' + total + '");'
    );
    main = main.concat("}}");

    let solutionCode = editorCode?.getValue();
    main = main.concat(solutionCode);
    return main;
  }

  submit() {
    // TODO: this is for python only right now, need to account for the other languages
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
        this.setState({ height: "45vh", results: result, showResults: true });
      });
    });
  }

  render() {
    const { code, height, results, showResults } = this.state;
    return (
      <>
        <Editor
          height={height}
          width={width}
          language={language}
          value={code}
          onMount={this.handleEditorDidMount}
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
