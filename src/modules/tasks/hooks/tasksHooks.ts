import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteTask, GetTasks, PostTask, UpdateTask } from "../services/tasksServices";
import type { TaskData } from "../schemas/TaskFormSchema";
import type { TaskType } from "../types/TaskType";


export const useGetTasks = <T = TaskType[]>(query?: string) => {
  return useQuery<T>({
    queryKey: ["tasks", query],
    queryFn: () => GetTasks<T>(query),
  });
};


export const usePostTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["post-task"],
    mutationFn: (data: TaskData) => PostTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};


export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-task"],
    mutationFn: ({ id, task }: { id: string; task: TaskData }) =>
      UpdateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};


export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-task"],
    mutationFn: (id: string) => DeleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
