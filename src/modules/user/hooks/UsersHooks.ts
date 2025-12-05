import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import {
  getAllUsers,
  updateUser,
  uploadUserProfilePicture,
} from "../services/UserServices";
import queryClient from "../../../common/clients/reactQueryClient";

// GET USERS
export const useGetUsers = <T>(query?: string): UseQueryResult<T> => {
  return useQuery<T>({
    queryKey: ["users", query],
    queryFn: () => getAllUsers<T>(query),
  });
};

// UPDATE USER
export const useUpdateUser = <T>(): UseMutationResult<
  T,
  unknown,
  { id: number; user: T },
  unknown
> => {
  return useMutation<T, unknown, { id: number; user: T }>({
    mutationFn: ({ id, user }) => updateUser<T>(id, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// UPLOAD PROFILE PICTURE
export const useUploadProfilePicture = <T>(): UseMutationResult<
  T,
  Error,
  FormData
> => {
  return useMutation<T, Error, FormData>({
    mutationFn: (formData: FormData) => uploadUserProfilePicture<T>(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users", "current"] });
    },
  });
};
