import React from "react";
import Editor from "@monaco-editor/react";

const height = "90vh";
const width = "50%";
const language = "javascript";
// TODO: need dropdown selection for language

let editorCode = null;

function handleEditorDidMount(editor, monaco) {
  editorCode = editor;
}

function submit() {
  // TODO: need to somehow send the resulting code to the compiler
  alert(editorCode?.getValue());
}

class Monaco extends React.Component {
  render() {
    return (
      <>
        <Editor
          height={height}
          width={width}
          defaultLanguage={language}
          defaultValue="// some starter code \n (maybe pass in a number and we dig our db for the text"
          onMount={handleEditorDidMount}
        />
        <button onClick={submit}>Submit Code</button>
      </>
    );
  }
}
export default Monaco;
