import React, { useState, useEffect, useContext, useRef } from "react";
import Editor from "@monaco-editor/react";
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
