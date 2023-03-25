import { post, get, patch } from "./base.js";

const URL = "/premium";

export const createPaymentIntent = function (total) {
  return post(URL + `/pay`, { total }).then((res) => res.data);
};

export const upgradeUser = function (planType) {
  return patch(URL + `/upgrade`, { planType }).then((res) => res.data);
};

export const downgradeUser = function () {
  return patch(URL + `/cancel`).then((res) => res.data);
};
