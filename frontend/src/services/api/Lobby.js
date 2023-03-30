import { post, get, patch } from "./base.js";

const URL = "/lobby";

export const createLobby = function (lobbyId) {
  return post(URL + `/${lobbyId}`).then((res) => res.data);
};

export const getLobby = function (lobbyId) {
  return get(URL + `/${lobbyId}`).then((res) => res.data.lobby);
};
