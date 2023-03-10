import axios from "axios";

let url = process.env.REACT_APP_BACKEND_LOCALHOST + "/api";
if (process.env.NODE_ENV === "production") {
  url = process.env.REACT_APP_PRODUCTION_URL + "/api";
}

const apiClient = axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const { get, post, put, patch, delete: destroy } = apiClient;
export { get, post, put, patch, destroy };
