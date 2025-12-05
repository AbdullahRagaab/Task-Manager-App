/* eslint-disable @typescript-eslint/no-unused-vars */
import apiClient from "../clients/apiClient";

// ✅ Get Current User from Token
export const getCurrentUser = async <T>(): Promise<T> => {
  try {
    // استخراج الـ user ID من الـ token
    const token = localStorage.getItem("access-refresh-token-storage");
    if (!token) throw new Error("No token found");

    const parsed = JSON.parse(token);
    const userId = parsed.state?.access?.split("_")[2]; 

    if (!userId) throw new Error("Invalid token");

    const { data } = await apiClient.get(`/users/${userId}`);
    return data;
  } catch (error) {
    throw new Error("Failed to fetch current user");
  }
};