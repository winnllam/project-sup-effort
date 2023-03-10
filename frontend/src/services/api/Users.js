import { get, post } from "./base.js";

const URL = "/users";

export const getAllUsers = function () {
  return get(URL + "/").then((res) => res.data);
};

export const signOnUser = function (email, username) {
  return post(URL + "/signon", { email, username }).then((res) => res.data);
};

// export const signUpUser = function (username, email) {
//   return post(URL + "/signup", { username, email }).then((res) => res.data);
// };

// export const signInUser = function (username) {
//   return post(URL + "/signin", { username }).then((res) => res.data);
// };

export const getUser = function (userId) {
  return get(URL + `/${userId}`).then((res) => res.data);
};

export const getMe = function () {
  return get(URL + "/me").then((res) => res.data);
};
