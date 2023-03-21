import React from "react";
import { useLocation } from "react-router-dom";
import Problems from "../Problems/Problems";
import Coding from "./Coding";

const CodingHook = () => {
  const location = useLocation();

  if (location.state) {
    const { number } = location.state;
    return <Coding number={number} />;
  } else {
    return <Problems />;
  }
};

export default CodingHook;
