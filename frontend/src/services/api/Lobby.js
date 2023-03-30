import { post, get, patch } from "./base.js";

const URL = "/lobby";

export const createLobby = function (lobbyId) {
  return post(URL + `/${lobbyId}`).then((res) => res.data);
};
