import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7204/api",

  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động gắn Authorization header cho mọi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default axiosInstance;
