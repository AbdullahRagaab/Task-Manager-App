import apiClient from "../clients/apiClient";
import { ENDPOINTS } from "../constants/endpoints";

export const getCurrentUser = async <T>(): Promise<T> => {
  const { data } = await apiClient.get(ENDPOINTS.USERS.CURRENT);

  return data;
};
