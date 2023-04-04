import React, { useState } from "react";
import styles from "./Dashboard-Competition.module.css";
import image from "../../../assets/dashboard_competition.svg";
import dashboardStyles from "../../../pages/Dashboard/Dashboard.module.css";
import getLobbyName from "../../../lobby/lobbyName";
import * as lobbyService from "../../../services/api/Lobbies.js";
import * as userService from "../../../services/api/Users.js";

const lobbyName = getLobbyName();

const DashboardCompetition = () => {
  const [lobbyId, setLobbyId] = useState("");

  const handleCreateLobby = () => {
    userService.getMe().then((res) => {
      lobbyService.createLobby(lobbyName, res.username).then(() => {
        window.location.href = "/coding/" + lobbyName;
      });
    });
  };

  const onChangeHandler = (event) => {
    setLobbyId(event.target.value);
  };

  const redirectToLobby = () => {
    lobbyService.getAllLobbies().then((res) => {
      if (res.lobbies.includes(lobbyId)) {
        window.location.href = "/coding/" + lobbyId;
      } else {
        alert("Lobby does not exist!");
      }
    });
  };

  return (
    <div className={styles.competition}>
      <div class={styles.title}>Competition</div>

      <div class={styles.section}>
        <div class={styles.subtitle}>New Competition</div>
        <div class={styles.box}>
          <b>Difficulty:</b>{" "}
          <select class={styles.dropdown}>
            <option
              value=""
              disabled
              selected
              hidden
              class={styles.optionTitle}
            >
              Choose a difficulty
            </option>
            <option value="easy" class={styles.option}>
              Easy
            </option>
            <option value="medium" class={styles.option}>
              Medium
            </option>
            <option value="hard" class={styles.option}>
              Hard
            </option>
          </select>{" "}
          <button class={styles.button} onClick={handleCreateLobby}>
            Generate
          </button>
        </div>
      </div>

      <div class={styles.section}>
        <div class={styles.subtitle}>Join Competition</div>
        <div class={styles.box}>
          <b>Contest URL:</b>{" "}
          <input
            type="text"
            id={styles.contestCode}
            name="contest"
            placeholder="Enter Lobby ID"
            onChange={onChangeHandler}
            value={lobbyId}
          ></input>
          <br />
          <button class={styles.button} onClick={redirectToLobby}>
            Start
          </button>
        </div>
      </div>
      <img
        src={image}
        class={dashboardStyles.graphics}
        alt="coding history"
      ></img>
    </div>
  );
};

export default DashboardCompetition;
