import React from "react";
import { useLocation } from "react-router-dom";
import Problems from "../Problems/Problems";
import Coding from "./Coding";

const CodingLobbyHook = () => {
  const location = useLocation();
  console.log(location);
  const splitter = location.pathname.split("/");
  return <Coding id={splitter[splitter.length - 1]} />;
};

export default CodingLobbyHook;
