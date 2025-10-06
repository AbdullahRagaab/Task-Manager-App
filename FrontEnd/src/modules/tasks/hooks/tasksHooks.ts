import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import {
  DeleteTask,
  GetTasks,
  PostTask,
  UpdateTask,
} from "../services/tasksServices";
import type { TaskData } from "../schemas/TaskFormSchema";

export const useGetTasks = <T>(query?: string): UseQueryResult<T> => {
  return useQuery<T>({
    queryKey: ["tasks", query], // ✅ queryKey depends on query
    queryFn: () => GetTasks<T>(query),
  });
};

export const usePostTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PostTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, task }: { id: string; task: TaskData }) =>
      UpdateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
