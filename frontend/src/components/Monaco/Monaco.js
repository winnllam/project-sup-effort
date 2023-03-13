import React from "react";
import Editor from "@monaco-editor/react";
import * as compilerService from "../../services/api/JDoodle.js";
import * as problemService from "../../services/api/Problems.js";

const height = "90vh";
const width = "50%";
// TODO: need dropdown selection for language and then get it passed in
const languageDropdown = "python";

let editorCode = null;

function handleEditorDidMount(editor, monaco) {
  editorCode = editor;
}

function submit() {
  // TODO: need to somehow send the resulting code to the compiler
  problemService.getTestCases(1).then((res) => {
    let addTests = editorCode?.getValue();
    console.log(addTests);

    addTests = addTests.concat(
      "\r\nprint('Expected: " +
        res[0].output +
        "; Actual:', double(" +
        res[0].input +
        "))"
    );
    console.log(addTests);

    compilerService
      .executeCode(addTests, languageDropdown)
      .then((output) => console.log(output));
  });
}

class Monaco extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: null,
    };

    problemService.getStarterCode(1, languageDropdown).then((res) => {
      this.setState({ code: res.code });
    });
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
