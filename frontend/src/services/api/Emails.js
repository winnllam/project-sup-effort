import { post } from "./base.js";

const URL = "/emails";

export const sendEmail = function (to, subject, text, html = null) {
  return post(URL + "/send", { to, subject, text, html }).then(
    (res) => res.data
  );
};
