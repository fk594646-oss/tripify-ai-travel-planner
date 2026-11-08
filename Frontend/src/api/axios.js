import axios from "axios";
import { AUTH_API } from "../config.js";

const api = axios.create({
  baseURL: `${AUTH_API}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
