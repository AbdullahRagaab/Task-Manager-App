import axios from "axios";
import { useAuthStore } from "../../modules/auth/stores/useAuthStore";

// 🔥 MockAPI Base URL - غيّرها بعد ما تنشئ الـ project
const API_BASE_URL = "https://692f8384778bbf9e006dabcf.mockapi.io"; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor - يضيف الـ token
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().access;
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;