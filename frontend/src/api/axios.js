import axios from "axios";

const api = axios.create({
  baseURL: "/api",        // vite proxy forwards this to http://localhost:5000/api
  withCredentials: true,  // send cookies with every request
});

export default api;