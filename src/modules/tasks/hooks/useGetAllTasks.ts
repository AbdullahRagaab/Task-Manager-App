import { useQuery } from "@tanstack/react-query";
import { GetTasks } from "../services/tasksServices";
import type { TaskType } from "../types/TaskType";

type TasksResponse = TaskType[] | { results: TaskType[] };

export const useGetAllTasks = () => {
  return useQuery<TaskType[]>({
    queryKey: ["tasks", "all"],
    queryFn: async () => {
      const res = (await GetTasks()) as TasksResponse;

      if (Array.isArray(res)) return res;
      if (res && typeof res === "object" && Array.isArray(res.results)) return res.results;

      return [];
    },
  });
};
