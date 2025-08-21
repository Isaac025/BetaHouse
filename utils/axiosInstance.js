import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://betahouse-backend-pchn.onrender.com/api",
});
