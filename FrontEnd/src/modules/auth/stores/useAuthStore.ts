import { create } from "zustand";
import type { TokenRefreshType } from "../types";
import { persist } from "zustand/middleware";

type AuthStore = {
  isAuthenticated: boolean;
  access: string | null;
  refresh: string | null;

  saveToken: (tokens: TokenRefreshType) => void;
  removeToken: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      access: null,
      refresh: null,

      removeToken: () =>
        set({
          isAuthenticated: false,
          access: null,
          refresh: null,
        }),

      saveToken: (tokens) =>
        set({
          isAuthenticated: true,
          access: tokens.access,
          refresh: tokens.refresh,
        }),
    }),
    {
      name: "access-refresh-token-storage",
    }
  )
);
