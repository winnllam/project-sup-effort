import React from "react";
import { useLocation } from "react-router-dom";
import Coding from "./Coding";

const CodingLobbyHook = () => {
  const location = useLocation();
  const splitter = location.pathname.split("/");
  return <Coding id={splitter[splitter.length - 1]} />;
};

export default CodingLobbyHook;
