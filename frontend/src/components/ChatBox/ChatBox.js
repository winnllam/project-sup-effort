import React, { useEffect, useState, useContext } from "react";
import chatboxStyles from "./ChatBox.module.css";
import { io } from "socket.io-client";
import * as userService from "../../services/api/Users.js";
import { SocketContext } from "../../context/socket.js";

function ChatBox(props) {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const messageInput = document.getElementById("message-input");
    const newMessage = username + ": " + messageInput.value;
    setMessages([...messages, newMessage]);
    socket.emit("send-message", newMessage, props.lobby);
    messageInput.value = "";
  };

  useEffect(() => {
    userService.getMe().then((res) => {
      setUsername(res.username);
    });
  }, [props.lobby]);

  useEffect(() => {
    if (!socket || username === "") {
      return;
    }
    let lobby = props.lobby;
    socket.emit("join-room", lobby);
    console.log(socket.id + " joined room " + lobby);
    socket.emit("user-connected", username, props.lobby);
    if (messages.length === 0) {
      let newMessage = username + " has joined the chat";
      setMessages([...messages, newMessage]);
    }

    socket.on("user-connected", (message) => {
      let newMessage = message + " has joined the chat";
      setMessages([...messages, newMessage]);
    });

    socket.on("receive-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket, username, props.lobby]);

  return (
    <div className={chatboxStyles.chatbox}>
      {messages.map((message, index) => (
        <p key={index} className={chatboxStyles.messagesListLi}>
          {message}
        </p>
      ))}
      <div className={chatboxStyles.messageForm}>
        <form id="message-form" onSubmit={handleSubmit}>
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

export default ChatBox;
