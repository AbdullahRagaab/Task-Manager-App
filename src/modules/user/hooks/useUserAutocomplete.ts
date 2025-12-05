// src/modules/users/hooks/userHooks.ts
import { useQuery } from "@tanstack/react-query";
import { fetchUsersAutocompleteService } from "../../tasks/services/fetchUsersAutocompleteService";

export const useUserAutocomplete = (search: string) => {
  return useQuery({
    queryKey: ["users-autocomplete", search],
    queryFn: () => fetchUsersAutocompleteService(search),
    enabled: !!search,
  });
};
