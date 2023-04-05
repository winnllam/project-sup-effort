import { get, post, patch } from "./base.js";

const URL = "/users";

export const getAllUsers = function (page = 0, limit = 10) {
  return get(URL + `/?page=${page}&limit=${limit}`).then((res) => res.data);
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

export const signOut = function () {
  return get(URL + "/signout").then((res) => res.data);
};

export const changeRole = function (userId, action) {
  return patch(URL + `/${userId}`, {
    action,
  }).then((res) => res.data);
};
