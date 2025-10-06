// src/modules/users/services/userServices.ts

import apiClient from "../../../common/clients/apiClient";
import { ENDPOINTS } from "../../../common/constants/endpoints";
import type { UserOption } from "../../../common/types/UserOption";

export const fetchUsersAutocompleteService = async (search: string): Promise<UserOption[]> => {
  const response = await apiClient.get(ENDPOINTS.USERS.AUTOCOMPLETE, {
    params: { search: search || "", limit: 5 },
  });

  return response.data;
};
