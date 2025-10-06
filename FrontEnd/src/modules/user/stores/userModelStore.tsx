import { create } from "zustand";
import type { UserType } from "../types/UserType";

type UserModalType = {
  showUserModal: boolean;
  mode: "editMode" | "createMode" | "viewMode" | null;
  showProfileModal: boolean;
  user: UserType | null;

  openUserModal: (
    mode: "editMode" | "createMode" | "viewMode" | null,
    task?: UserType | null
  ) => void;
    closeUserModal: () => void;
  openProfileModal: (user: UserType) => void;
  updateUserField: <K extends keyof UserType>(
    key: K,
    value: UserType[K]
  ) => void;
};

export const useUserModelStore = create<UserModalType>((set) => ({
  showUserModal: false,
  showProfileModal: false,
  mode: null,
  user: null,
  openProfileModal: (user) => {
    set({
      showProfileModal: true,
      showUserModal: false,
      user: user,
    });
  },
  openUserModal: (mode, user = null) => {
    set({
      showUserModal: true,
      showProfileModal: false,
      mode,
      user: user,
    });
  },
  closeUserModal: () => {
    set({
      showUserModal: false,
      showProfileModal: false,
      mode: null,
      user: null,
    });
  },

  updateUserField: (key, value) => {
    set((state) => ({
      user: state.user ? { ...state.user, [key]: value } : state.user,
    }));
  },

}));

// import { create } from "zustand";
// import type { UserType } from "../types/UserType";

// type UserModalType = {
//   showUserModal: boolean;
//   mode: "editMode" | "createMode" | "viewMode" | null;
//   showProfileModal: boolean;
//   user: UserType | null;

//   openUserModal: (
//     mode: "editMode" | "createMode" | "viewMode" | null,
//     task?: UserType | null
//   ) => void;
//   closeUserModal: () => void;
//   openProfileModal: (user: UserType) => void;
//   updateUserField: <K extends keyof UserType>(
//     key: K,
//     value: UserType[K]
//   ) => void;
// };

// export const useUserModelStore = create<UserModalType>((set) => ({
//   showUserModal: false,
//   showProfileModal: false,
//   mode: null,
//   user: null,
//   openProfileModal: (user) => {
//     set({
//       showProfileModal: true,
//       showUserModal: false,
//       user: user,
//     });
//   },
//   openUserModal: (mode, user = null) => {
//     set({
//       showUserModal: true,
//       showProfileModal: false,
//       mode,
//       user,
//     });
//   },
//   closeUserModal: () => {
//     set({
//       showUserModal: false,
//       showProfileModal: false,
//       mode: null,
//       user: null,
//     });
//   },

//   updateUserField: (key, value) => {
//     set((state) => ({
//       user: state.user ? { ...state.user, [key]: value } : state.user,
//     }));
//   },
// }));
