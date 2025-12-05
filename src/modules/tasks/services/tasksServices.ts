import axios from "axios";
import { useAuthStore } from "../../auth/stores/useAuthStore";
import type { TaskData } from "../schemas/TaskFormSchema";

const API_BASE_URL = "https://692f8384778bbf9e006dabcf.mockapi.io";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});


apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().access;

  if (config.url?.startsWith("/tasks")) {
    return config;
  }

  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});





// ❌ Handle 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ----------------------- API -----------------------

export const GetTasks = async <T>(query?: string): Promise<T> => {
  const url = query ? `/tasks?${query}` : "/tasks";
  const { data } = await apiClient.get(url);
  return data as T;
};

export const PostTask = async (task: TaskData) => {
  const { data } = await apiClient.post("/tasks", task);
  return data;
};


export const UpdateTask = async (id: string, task: TaskData) => {
  const clean = {
    ...task,
    assignee: task.assignee?.value ?? null,
  };

  const { data } = await apiClient.put(`/tasks/${id}`, clean);
  return data;
};



export const DeleteTask = async (id: string) => {
  await apiClient.delete(`/tasks/${id}`);
  return true;
};
