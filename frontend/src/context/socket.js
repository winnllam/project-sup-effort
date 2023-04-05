import React from "react";
import { io } from "socket.io-client";

let url = process.env.REACT_APP_BACKEND_LOCALHOST;
if (process.env.NODE_ENV === "production") {
  url = process.env.REACT_APP_PRODUCTION_URL;
}

export const socket = io(url);
export const SocketContext = React.createContext();
