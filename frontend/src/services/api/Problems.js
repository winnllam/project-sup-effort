import { post, get, patch } from "./base.js";

const URL = "/problems";

export const getProblem = function (problemId) {
  return get(URL + `/${problemId}`).then((res) => res.data.problem);
};

export const getProblems = function (page = 0, limit = 10, difficulty) {
  return get(URL + `?page=${page}&limit=${limit}`, { difficulty }).then(
    (res) => res.data
  );
};

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

export const getTestCases = function (problemId, page = 0, limit = 10) {
  return get(URL + `/${problemId}/testCases?page=${page}&limit=${limit}`).then(
    (res) => res.data
  );
};

export const updateProblem = function (problemId, name, desc, difficulty) {
  return patch(URL + `/${problemId}`, {
    name: name,
    description: desc,
    difficulty: difficulty,
  }).then((res) => res.data);
};

export const updateTest = function (problemId, testId, input, output) {
  return patch(URL + `/${problemId}/testCases/${testId}`, {
    input: input,
    output: output,
  }).then((res) => res.data);
};

export const addTest = function (problemId, input, output, desc = "") {
  return post(URL + `/${problemId}/testCases`, {
    input: input,
    output: output,
    description: desc,
  }).then((res) => res.data);
};

export const addProblem = function (name, description, difficulty) {
  return post(URL, {
    name: name,
    description: description,
    difficulty: difficulty,
  }).then((res) => res.data);
};

export const addSolutionCode = function (problemId, language, code) {
  return post(URL + `/${problemId}/solution`, {
    language,
    code,
  }).then((res) => res.data);
};

export const getSolutionCode = function (problemId, language) {
  return get(URL + `/${problemId}/solution/${language}`).then(
    (res) => res.data.solution
  );
};
