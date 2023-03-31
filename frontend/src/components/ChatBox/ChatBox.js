import React from "react";
import chatboxStyles from "./ChatBox.module.css";
import { io } from "socket.io-client";
import * as userService from "../../services/api/Users.js";

class ChatBox extends React.Component {
  constructor(props) {
    super(props);

    let url = process.env.REACT_APP_BACKEND_LOCALHOST;
    if (process.env.NODE_ENV === "production") {
      url = process.env.REACT_APP_PRODUCTION_URL;
    }
    this.socket = io(url);
    this.lobby = this.props.lobby;
    this.userId = "";
    this.state = {
      messages: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    userService.getMe().then((res) => {
      this.userId = res.userId;
      console.log(this.userId);
    });

    this.socket.on("connect", () => {
      console.log(`Connected to socket server with id ${this.socket.id}`);
      this.socket.emit("join-room", this.lobby);
      this.socket.emit("user-connected", this.userId, this.lobby);
      let newMessage = this.userId + " has joined the chat";
      this.setState({
        messages: [...this.state.messages, newMessage],
      });
    });
    this.socket.on("user-connected", (message) => {
      let newMessage = message + " has joined the chat";
      this.setState({
        messages: [...this.state.messages, newMessage],
      });
    });
    this.socket.on("receive-message", (message) => {
      this.setState({
        messages: [...this.state.messages, message],
      });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  handleSubmit(event) {
    event.preventDefault();
    const messageInput = document.getElementById("message-input");
    const newMessage = this.userId + ": " + messageInput.value;
    this.setState({
      messages: [...this.state.messages, newMessage],
    });
    this.socket.emit("send-message", newMessage, this.lobby);
    messageInput.value = "";
  }

  render() {
    const { messages } = this.state;

    return (
      <div className={chatboxStyles.chatbox}>
        <ul className={chatboxStyles.messagesList}>
          {messages.map((message, index) => (
            <li key={index} className={chatboxStyles.mesagesListLi}>
              {message}
            </li>
          ))}
        </ul>
        <div className={chatboxStyles.messageForm}>
          <form id="message-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className={chatboxStyles.messageInput}
              id="message-input"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className={chatboxStyles.sendButton}
              id="send-button"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChatBox;
