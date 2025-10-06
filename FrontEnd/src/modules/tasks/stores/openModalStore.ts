import { create } from "zustand";
import type { TaskType } from "../types/TaskType";

type OpenModalState = {
  showTaskModal: boolean;
  mode: "editMode" | "createMode" | "viewMode" | null;
  task: TaskType | null;
  openModal: (
    mode: "editMode" | "createMode" | "viewMode" | null,
    task?: TaskType | null
  ) => void;
  closeModal: () => void;
  updateTaskField: <K extends keyof TaskType>(
    key: K,
    value: TaskType[K]
  ) => void;
};

export const useTaskModalStore = create<OpenModalState>((set) => ({
  showTaskModal: false,
  mode: null,
  task: null,
  openModal: (mode, task = null) =>
    set({
      showTaskModal: true,
      mode,
      task,
    }),
  closeModal: () =>
    set({
      showTaskModal: false,
      mode: null,
      task: null,
    }),
  updateTaskField: (key, value) => {
    set((state) => ({
      task: state.task ? { ...state.task, [key]: value } : state.task,
    }));
  },
}));
