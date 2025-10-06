import React from "react";
import { Outlet } from "react-router-dom";
import { useUserModelStore } from "../stores/userModelStore";
import UserForm from "../forms/UserForm";
import ProfileImageModal from "../forms/ProfileImageModal";

export default function UserPageLayout() {
  const { showUserModal, showProfileModal } = useUserModelStore();
  return (
    <div className="relative">
      {showUserModal && <UserForm />}
      {showProfileModal && <ProfileImageModal />}
      <Outlet />
    </div>
  );
}
