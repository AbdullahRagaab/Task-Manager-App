/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "../../../common/clients/apiClient";
import type { UserOption } from "../../../common/types/UserOption";

// ✅ Fetch Users for Autocomplete
export const fetchUsersAutocompleteService = async (
  search: string
): Promise<UserOption[]> => {
  try {
    const { data } = await apiClient.get("/users");

    // Filter users by search
    const filtered = data.filter(
      (user: any) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.full_name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.slice(0, 5).map((user: any) => ({
      label: user.full_name,
      value: user.id,
    }));
  } catch (error) {
    return [];
  }
};