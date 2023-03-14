import React from "react";
import Editor from "@monaco-editor/react";
import * as compilerService from "../../services/api/JDoodle.js";
import * as problemService from "../../services/api/Problems.js";

const height = "90vh";
const width = "100%";
// TODO: need dropdown selection for language and then get it passed in
const languageDropdown = "python";

let editorCode = null;

function handleEditorDidMount(editor, monaco) {
  editorCode = editor;
}

function submit() {
  // TODO: need to somehow send the resulting code to the compiler
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

    compilerService
      .executeCode(addTests, languageDropdown)
      .then((output) => alert(output.output));
    // TODO: send output somewhere else to dusplay results properly
  });
}

class Monaco extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: null,
      code: null,
    };
  }

  componentWillReceiveProps(props) {
    console.log(props);

    if (props.number !== null) {
      problemService
        .getStarterCode(props.number, languageDropdown)
        .then((res) => {
          this.setState({ code: res.code });
        });
    }
  }

  render() {
    const { code } = this.state;
    return (
      <>
        <Editor
          height={height}
          width={width}
          defaultLanguage={languageDropdown}
          defaultValue={code}
          onMount={handleEditorDidMount}
        />
        <button onClick={submit}>Submit Code</button>
      </>
    );
  }
}
export default Monaco;
