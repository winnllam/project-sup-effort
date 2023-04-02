import React from "react";
import { Modal, Button } from "react-bootstrap";
import getLobbyName from "../../lobby/lobbyName";
import * as lobbyService from "../../services/api/Lobbies.js";
import { useHistory } from "react-router-dom";
import navbarStyles from "./Navbar.module.css";

const lobbyName = getLobbyName();

const handleCreateLobby = () => {
  console.log("Create Lobby");
  lobbyService.createLobby(lobbyName).then((res) => {
    window.location.href = "/coding/" + lobbyName;
  });
};

function LobbyModal(props) {
  const { show, handleClose } = props;
  return (
    <Modal show={show} onHide={handleClose} class={navbarStyles.myModal}>
      <Modal.Header closeButton>
        <Modal.Title>Lobby Creation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        https://www.divideandconquer.me/coding/{lobbyName}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCreateLobby}>
          Create Lobby
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LobbyModal;
