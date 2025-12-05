/* eslint-disable @typescript-eslint/no-unused-vars */
import apiClient from "../../../common/clients/apiClient";

// ✅ Get All Users with Pagination
export const getAllUsers = async <T>(query: string | undefined): Promise<T> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await apiClient.get<any[]>("/users");

    if (query && !query.includes("page_size=all")) {
      const params = new URLSearchParams(query);
      const page = parseInt(params.get("page") || "1");
      const pageSize = parseInt(params.get("page_size") || "10");

      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginated = data.slice(start, end);

      return {
        count: data.length,
        results: paginated,
        total_pages: Math.ceil(data.length / pageSize),
      } as T;
    }

    return data as T;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

// ✅ Update User
export const updateUser = async <T>(id: number, user: T): Promise<T> => {
  const { data } = await apiClient.put(`/users/${id}`, user);
  return data;
};

export const uploadUserProfilePicture = async <T>(
  _formData: FormData
): Promise<T> => {
  try {
    const mockUrl = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;

    const token = localStorage.getItem("access-refresh-token-storage");
    if (!token) throw new Error("No token found");

    const parsed = JSON.parse(token);
    const userId = parsed.state?.access?.split("_")[2]; 

    if (!userId) throw new Error("Invalid token");

    const { data } = await apiClient.patch(`/users/${userId}`, {
      profile_picture: mockUrl,
    });

    return data;
  } catch (error) {
    throw new Error("Failed to upload picture");
  }
};
