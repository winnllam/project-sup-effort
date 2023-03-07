import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:9000/api",
  headers: { "Content-Type": "application/json" },
});

const { get, post, put, patch, delete: destroy } = apiClient;
export { get, post, put, patch, destroy };
