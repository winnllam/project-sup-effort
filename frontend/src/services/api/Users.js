import { get, post } from "./base.js";

const URL = "/users";

export const getAllUsers = function () {
  return get(URL + "/").then((res) => res.data);
};

export const signUpUser = function (username, email) {
  return post(URL + "/signup", { username, email }).then((res) => res.data);
};

export const signInUser = function (username) {
  return post(URL + "/signin", { username }).then((res) => res.data);
};
