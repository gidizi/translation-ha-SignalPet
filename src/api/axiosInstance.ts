import axios from "axios";

//todo: use environemnt var for baseUrl conf
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

//todo important: store cookies more securely

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;
