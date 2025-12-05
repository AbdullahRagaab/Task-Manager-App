// src/stores/useNavigationStore.ts
import { create } from "zustand";

type NavigationStoreState = {
  currentPage: string;
  navigate: (page: string) => void;
};

export const useNavigationStore = create<NavigationStoreState>((set) => ({
  currentPage: "",
  navigate: (page) => {
    set({ currentPage: page });
  },
}));
