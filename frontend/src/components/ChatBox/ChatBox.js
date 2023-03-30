import React from 'react';
import chatboxStyles from './ChatBox.module.css';
import { io } from "socket.io-client";

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io("http://localhost:9000");
    this.state = {
      messages: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.socket.on("connect", () => {
        console.log(`Connected to socket server with id ${this.socket.id}`);
        this.socket.emit("user-connected", this.socket.id);
        let newMessage = this.socket.id + " has joined the chat";
        this.setState({
          messages: [...this.state.messages, newMessage]
        });
    });
    this.socket.on("user-connected", (message) => {
        let newMessage = message + " has joined the chat";
        this.setState({
          messages: [...this.state.messages, newMessage]
        });
    });
    this.socket.on("receive-message", (message) => {
        this.setState({
          messages: [...this.state.messages, message]
        });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  handleSubmit(event) {
    event.preventDefault();
    const messageInput = document.getElementById('message-input');
    const newMessage = this.socket.id + ": " + messageInput.value;
    this.setState({
      messages: [...this.state.messages, newMessage]
    });
    this.socket.emit("send-message", newMessage);
    messageInput.value = '';
  }

  render() {
    const { messages } = this.state;

    return (
      <div className={chatboxStyles.chatbox}>
        <ul className={chatboxStyles.messagesList}>
          {messages.map((message, index) => (
            <li key={index} className={chatboxStyles.mesagesListLi}>{message}</li>
          ))}
        </ul>
        <div className={chatboxStyles.messageForm}>
          <form id="message-form" onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              className={chatboxStyles.messageInput} 
              id="message-input"
              placeholder="Type a message..." />
            <button type="submit" className={chatboxStyles.sendButton} id="send-button">Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChatBox;