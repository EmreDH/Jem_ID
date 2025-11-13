import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7239/api",
});

export default apiClient;
