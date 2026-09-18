import axios from "axios";

export const TOKEN_KEY = "ttp_crm_token";

/* Backend API URL */
const baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

/* Axios API client */
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* Attach JWT token to every request */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* Normalize responses and errors */
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response?.status;

    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    /* Remove invalid/expired token */
    if (
      status === 401 &&
      !window.location.pathname.startsWith("/login")
    ) {
      localStorage.removeItem(TOKEN_KEY);
    }

    return Promise.reject({
      status,
      message,
    });
  }
);

export default api;