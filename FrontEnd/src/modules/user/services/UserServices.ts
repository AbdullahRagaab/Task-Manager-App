import apiClient from "../../../common/clients/apiClient";
import { ENDPOINTS } from "../../../common/constants/endpoints";

export const getAllUsers = async <T>(query: string | undefined): Promise<T> => {
  const url = query
    ? `${ENDPOINTS.USERS.ROOT}/?${query}`
    : ENDPOINTS.USERS.ROOT;
  const { data } = await apiClient.get<T>(url);

  return data;
};

// export const updateUser = async <T>(id: string, user: T): Promise<T> => {
//   console.log("🔗 API CALL:", `${ENDPOINTS.USERS}/${id}/`, user);
//   const { data } = await apiClient.patch(`${ENDPOINTS.USERS}/${id}/`, user);

//   return data;
// };

export const updateUser = async <T>(id: number, user: T): Promise<T> => {
  console.log("🔗 API CALL:", `${ENDPOINTS.USERS.ROOT}/${id}/`, user);
  const { data } = await apiClient.patch(`${ENDPOINTS.USERS.ROOT}/${id}/`, user);
  return data;
};


export const uploadUserProfilePicture = async <T>(
  formData: FormData
): Promise<T> => {
  const { data } = await apiClient.post(
    `${ENDPOINTS.USERS.UPLOAD_PROFILE_PICTURE}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// export const getUserAnalysis = async <T>(id: string): Promise<T> => {
//   // const {data} = await apiClient.get(`${ENDPOINTS.TASKS.}`)
//   return Promise.resolve();
// };
