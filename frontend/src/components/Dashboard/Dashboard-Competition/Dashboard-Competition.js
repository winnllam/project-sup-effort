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
    const dropdown = document.querySelector(`.${styles.dropdown}`);
    const selectedDifficulty = dropdown.value;

    if (selectedDifficulty === "") {
      alert("Please select a difficulty!");
    } else {
      userService.getMe().then((res) => {
        lobbyService
          .createLobby(lobbyName, res.username, selectedDifficulty)
          .then(() => {
            window.location.href = "/coding/" + lobbyName;
          });
      });
    }
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
      <div className={styles.title}>Competition</div>

      <div className={styles.section}>
        <div className={styles.subtitle}>New Competition</div>
        <div className={styles.box}>
          <b>Difficulty: </b>{" "}
          <select className={styles.dropdown}>
            <option
              value=""
              disabled
              selected
              hidden
              className={styles.optionTitle}
            >
              Choose a difficulty
            </option>
            <option value="easy" className={styles.option}>
              Easy
            </option>
            <option value="medium" className={styles.option}>
              Medium
            </option>
            <option value="hard" className={styles.option}>
              Hard
            </option>
          </select>{" "}
          <button className={styles.button} onClick={handleCreateLobby}>
            Generate
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.subtitle}>Join Competition</div>
        <div className={styles.box}>
          <b>Contest URL: </b>{" "}
          <input
            type="text"
            id={styles.contestCode}
            name="contest"
            placeholder="Enter Lobby ID"
            onChange={onChangeHandler}
            value={lobbyId}
          ></input>
          <br />
          <button className={styles.button} onClick={redirectToLobby}>
            Start
          </button>
        </div>
      </div>
      <img
        src={image}
        className={dashboardStyles.graphics}
        alt="coding history"
      ></img>
    </div>
  );
};

export default DashboardCompetition;
