// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://college-connect-backend-pearl.vercel.app/", // keep as per your backend
});

// Attach token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
