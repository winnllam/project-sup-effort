import { post, get } from "./base.js";

const URL = "/lobbies";

export const createLobby = function (lobbyId, username, difficulty) {
  return post(URL + `/${lobbyId}`, { username, difficulty }).then(
    (res) => res.data
  );
};

export const getLobby = function (lobbyId) {
  return get(URL + `/${lobbyId}`).then((res) => res.data.lobby);
};

export const joinLobby = function (lobbyId, username) {
  return post(URL + `/${lobbyId}/join`, { username }).then((res) => res.data);
};

export const getAllLobbies = function () {
  return get(URL + "/").then((res) => res.data);
};
