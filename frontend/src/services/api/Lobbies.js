import { post, get } from "./base.js";

const URL = "/lobbies";

export const createLobby = function (lobbyId) {
  return post(URL + `/${lobbyId}`).then((res) => res.data);
};

export const getLobby = function (lobbyId) {
  return get(URL + `/${lobbyId}`).then((res) => res.data.lobby);
};

export const getAllLobbies = function () {
  return get(URL + "/").then((res) => res.data);
};
