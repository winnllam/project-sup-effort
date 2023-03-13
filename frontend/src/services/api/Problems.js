import { post, get } from "./base.js";

const URL = "/problems";

export const addStarterCode = function (problemId, language, code, methodName) {
  return post(URL + `/${problemId}/starter`, {
    language,
    code,
    methodName,
  }).then((res) => res.data);
};

export const getStarterCode = function (problemId, language) {
  return get(URL + `/${problemId}/starter/${language}`).then(
    (res) => res.data.starter
  );
};

export const getTestCases = function (problemId) {
  return get(URL + `/${problemId}/testCases`).then((res) => res.data.test);
};
