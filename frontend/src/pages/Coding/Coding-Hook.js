import React from "react";
import { useLocation } from "react-router-dom";
import Coding from "./Coding";

const CodingHook = () => {
  const location = useLocation();
  const { number } = location.state;
  // TODO: if no number it doesn't redirect
  return <Coding number={number} />;
};

export default CodingHook;
