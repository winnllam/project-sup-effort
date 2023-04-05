// import React, { useState, useEffect, useContext } from "react";
// import Editor from "@monaco-editor/react";
// import monacoStyles from "./Monaco.module.css";
// import { SocketContext } from "../../context/socket.js";

// const width = "100%";
// let language = "";

// let editorCode = null;
// class MonacoOther extends React.Component {
//   constructor(props) {
//     super(props);
//     this.prevValue = "";
//     this.lobby = this.props.lobby;
//     this.user = this.props.user;
//     this.socket = useContext(SocketContext);
//     this.state = {
//       number: null,
//       code: null,
//       methodName: null,
//       height: "75vh",
//       setSpinner: false,
//     };
//   }

//   componentWillReceiveProps(props) {
//     if (props.language !== null) {
//       language = props.language;
//     }
//     if (props.number !== null) {
//       this.setState({ number: props.number });

//       // if the language has modified code from previous attempt
//       if (sessionStorage.getItem(this.user + language + this.lobby) !== null) {
//         // restore the code from storage
//         this.setState({
//           code: sessionStorage.getItem(this.user + language + this.lobby),
//         });
//       } else {
//         this.setState({ code: "Loading..." });
//       }
//     }
//   }

//   componentWillMount() {
//     this.socket.on("connect", () => {
//       console.log(
//         `${this.user} connected to socket server with id ${this.socket.id}`
//       );
//       this.socket.emit("join-room", this.lobby);
//     });

//     this.socket.on("receive-code", (code, language, user) => {
//       if (user === this.user) {
//         this.language = language;
//         sessionStorage.setItem(user + language + this.lobby, code);
//         this.setState(() => {
//           return {
//             code: code,
//           };
//         });
//       }
//     });
//   }

//   shouldComponentUpdate(nextState) {
//     return this.state !== nextState;
//   }

//   handleEditorDidMount(editor, monaco) {
//     editorCode = editor;
//   }

//   render() {
//     const { code, height } = this.state;
//     return (
//       <>
//         <Editor
//           height={height}
//           width={width}
//           language={language}
//           value={code}
//           onMount={this.handleEditorDidMount}
//           options={{ readOnly: true }}
//         />
//       </>
//     );
//   }
// }
// export default MonacoOther;

import React, { useState, useEffect, useContext, useRef } from "react";
import Editor from "@monaco-editor/react";
import monacoStyles from "./Monaco.module.css";
import { SocketContext } from "../../context/socket.js";

const width = "100%";

function MonacoOther(props) {
  const [code, setCode] = useState(null);
  const height = "75vh";
  const prevValue = useRef("");
  const lobby = props.lobby;
  const user = props.user;
  const socket = useContext(SocketContext);
  let language = "";

  useEffect(() => {
    // if the language has modified code from previous attempt
    if (sessionStorage.getItem(user + language + lobby) !== null) {
      // restore the code from storage
      setCode(sessionStorage.getItem(user + language + lobby));
    } else {
      setCode("Loading...");
    }
  }, [props.language, props.number, lobby, user]);

  useEffect(() => {
    socket.emit("join-room", lobby);
    console.log(socket.id + " joined room " + lobby);

    socket.on(
      "receive-code",
      (receivedCode, receivedLanguage, receivedUser) => {
        if (receivedUser === user) {
          language = receivedLanguage;
          sessionStorage.setItem(user + language + lobby, receivedCode);
          setCode(receivedCode);
        }
      }
    );

    return () => {
      socket.off("connect");
      socket.off("receive-code");
    };
  }, [user, socket, lobby]);

  function handleEditorDidMount(editor, monaco) {
    prevValue.current = editor.getValue();
  }

  return (
    <div>
      <Editor
        height={height}
        width={width}
        language={language}
        value={code}
        onMount={handleEditorDidMount}
        options={{ readOnly: true }}
      />
    </div>
  );
}

export default MonacoOther;
