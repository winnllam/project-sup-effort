import React, { useState } from "react";
import styles from "./Dashboard-Competition.module.css";
import image from "../../../assets/dashboard_competition.svg";
import dashboardStyles from "../../../pages/Dashboard/Dashboard.module.css";
import * as lobbyService from "../../../services/api/Lobby.js";

const DashboardCompetition = () => {
  const [lobbyId, setLobbyId] = useState("");

  const onChangeHandler = (event) => {
    setLobbyId(event.target.value);
  };

  const redirectToLobby = () => {
    console.log(lobbyId);
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
          <b>Question:</b>{" "}
          <select class={styles.dropdown}>
            <option
              value=""
              disabled
              selected
              hidden
              class={styles.optionTitle}
            >
              Choose a question
            </option>
            <option value="fruit" class={styles.option}>
              Fruit
            </option>
            <option value="vegetable" class={styles.option}>
              Vegetable
            </option>
            <option value="meat" class={styles.option}>
              Meat
            </option>
          </select>{" "}
          <button class={styles.button}>Start</button>
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
