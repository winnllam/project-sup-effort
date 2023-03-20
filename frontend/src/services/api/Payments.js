import { post, get, patch } from "./base.js";

const URL = "/payments";

export const createPaymentIntent = function () {
  return post(URL + `/`, JSON.stringify({})).then((res) => res.data);
};
