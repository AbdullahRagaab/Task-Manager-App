import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getCurrentUser } from "../services/currentUserService";

export const useGetCurrentUser = <T>(): UseQueryResult<T> => {
  return useQuery({
    queryKey: ["users", "current"],
    queryFn: () => getCurrentUser<T>(),
    staleTime: 1,
    retry: false,
  });
};
