import axios from "axios";

// Create Axios instance using environment variable
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 🔐 Automatically attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("cloudvote_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🌍 Global response error handler
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

export default API;
