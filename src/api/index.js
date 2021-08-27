import axios from "axios";

export const URL = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // dev code
    return "http://localhost:5000/";
  } else {
    // production code
    return `https://myfood-backend.herokuapp.com/`;
  }
};

const getBaseURL = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // dev code
    return "http://localhost:5000/api/";
  } else {
    // production code
    return `https://myfood-backend.herokuapp.com/api/`;
  }
};

const API_URL = getBaseURL();

export const $host = axios.create({
  // withCredentials: true,
  baseURL: API_URL,
});
