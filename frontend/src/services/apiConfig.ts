export const API_BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:5000/api/v1"
  : import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "/api/v1";
