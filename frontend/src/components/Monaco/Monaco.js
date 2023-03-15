import React from "react";
import Editor from "@monaco-editor/react";
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
      height: "90vh",
    };

    this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(props) {
    console.log(props);
    if (props.language !== null) {
      language = props.language;
    }
    if (props.number !== null) {
      this.setState({ number: props.number });
      problemService.getStarterCode(props.number, language).then((res) => {
        this.setState({ code: res.code });
      });
    }
  }

  shouldComponentUpdate(nextState) {
    return this.state !== nextState;
  }

  handleEditorWillMount(monaco) {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  handleEditorDidMount(editor, monaco) {
    editorCode = editor;
  }

  submit() {
    // TODO: this is for python only right now, need to account for the other languages
    problemService.getTestCases(1).then((res) => {
      let addTests = editorCode?.getValue();
      console.log(addTests);

      const total = res.total;
      const tests = res.test;

      addTests = addTests.concat("\r\npassCounter = 0");

      for (let i = 0; i < total; i++) {
        // what the function call looks like using the test input
        const functionCall = "double(" + tests[i].input + ")";
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

      compilerService.executeCode(addTests, language).then((output) => {
        alert(output.output);
        this.setState({ height: "45vh" });
      });
      // TODO: send output somewhere else to dusplay results properly
    });
  }

  render() {
    const { code, height } = this.state;
    return (
      <>
        <Editor
          height={height}
          width={width}
          defaultLanguage={language}
          value={code}
          beforeMount={this.handleEditorWillMount}
          onMount={this.handleEditorDidMount}
        />
        <button onClick={this.submit}>Submit Code</button>
      </>
    );
  }
}
export default Monaco;
