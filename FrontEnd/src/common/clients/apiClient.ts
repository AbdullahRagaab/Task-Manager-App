import axios from "axios";
import { useAuthStore } from "../../modules/auth/stores/useAuthStore";
import { ENDPOINTS } from "../constants/endpoints";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

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
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refresh;

        const response = await axios.post(`${import.meta.env.VITE_API_URL}${ENDPOINTS.AUTH.REFRESH}/`, { refresh: refreshToken }, { withCredentials: true });

        const newAccessToken = response.data.access;

        useAuthStore.getState().saveToken({
          access: newAccessToken,
          refresh: refreshToken,
        });

        // Update headers
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (err) {
        console.error("🔒 Token refresh failed", err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
