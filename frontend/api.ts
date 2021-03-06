import axios from "axios";
import { BACKEND_URL } from "./config";

export default axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});
