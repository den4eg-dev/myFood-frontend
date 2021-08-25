import axios from "axios";

const API_URL = `http://localhost:5000/api/`;

export const $host = axios.create({
  // withCredentials: true,
  baseURL: API_URL,
});
