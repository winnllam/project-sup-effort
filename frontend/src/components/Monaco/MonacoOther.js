import React, { PureComponent } from "react";
import Editor from "@monaco-editor/react";
import { MutatingDots } from "react-loader-spinner";
import monacoStyles from "./Monaco.module.css";
import * as compilerService from "../../services/api/JDoodle.js";
import * as problemService from "../../services/api/Problems.js";
import { io } from "socket.io-client";

const width = "100%";
let language = "";

let editorCode = null;
class MonacoOther extends React.Component {
  constructor(props) {
    super(props);
    this.prevValue = "";
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
      methodName: null,
      height: "75vh",
      setSpinner: false,
    };
  }

  componentWillReceiveProps(props) {
    if (props.language !== null) {
      language = props.language;
    }
    if (props.number !== null) {
      this.setState({ number: props.number });

      // if the language has modified code from previous attempt
      if (sessionStorage.getItem(this.user + language + this.lobby) !== null) {
        // restore the code from storage
        this.setState({
          code: sessionStorage.getItem(this.user + language + this.lobby),
        });
      } else {
        this.setState({ code: "Loading..." });
      }
    }
  }

  componentWillMount() {
    this.socket.on("connect", () => {
      console.log(
        `${this.user} connected to socket server with id ${this.socket.id}`
      );
      this.socket.emit("join-room", this.lobby);
    });

    this.socket.on("receive-code", (code, language, user) => {
      if (user === this.user) {
        this.language = language;
        sessionStorage.setItem(user + language + this.lobby, code);
        this.setState(() => {
          return {
            code: code,
          };
        });
      }
    });
  }

  shouldComponentUpdate(nextState) {
    return this.state !== nextState;
  }

  handleEditorDidMount(editor, monaco) {
    editorCode = editor;
  }

  render() {
    const { code, height, setSpinner } = this.state;
    return (
      <>
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
          options={{ readOnly: true }}
        />
      </>
    );
  }
}
export default MonacoOther;
