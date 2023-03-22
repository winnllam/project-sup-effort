import { post, get, patch } from "./base.js";

const URL = "/payments";

export const createPaymentIntent = function (total) {
  return post(URL + `/`, { total }).then((res) => res.data);
};
