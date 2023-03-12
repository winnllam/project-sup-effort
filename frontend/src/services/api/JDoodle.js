import { post } from "./base.js";

const URL = "/compilers";

export const executeCode = function (script, language) {
  return post(URL + "/execute", { script, language }).then((res) => res.data);
};
