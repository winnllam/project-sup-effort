import React from "react";
import { useLocation } from "react-router-dom";
import Problem from "./Problem.js";

const ProblemHook = () => {
  const location = useLocation();
  const splitter = location.pathname.split("/");
  return <Problem problemId={splitter[splitter.length - 1]} />;
};

export default ProblemHook;
