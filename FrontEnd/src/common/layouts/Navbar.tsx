import { LogOut, Home, CheckSquare, Users, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useState } from "react";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import type { UserType } from "../../modules/user/types/UserType";
import { useAuthStore } from "../../modules/auth/stores/useAuthStore";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuState, setMenuState] = useState(false);
  const currentUser = useGetCurrentUser<UserType>();
  const { removeToken } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg p-4">
      <div className="flex items-center justify-between ">
        <div className="flex items-center justify-between space-x-6 w-full">
          <h1 className="text-xl font-bold text-gray-800">TaskManager</h1>

          <div className="flex group">
            <div className="relative md:flex space-x-4 hidden">
              <NavbarItems />
            </div>
          </div>

          <div className="flex relative items-center space-x-4">
            <div
              className="flex items-center gap-2 hover:cursor-pointer min-w-[150px] select-none"
              onClick={() => setMenuState((prev) => !prev)}
            >
              {/* <User /> */}
              <img
                src={`${currentUser?.data?.profile_picture}`}
                alt=""
                className="w-[50px] h-[50px]"
              />
              <span className="text-sm text-gray-600">
                {currentUser?.data?.full_name}
              </span>
            </div>

            <div
              className={`flex-col absolute top-[150%] right-0 bg-white shadow-lg w-full z-50  ${
                menuState ? "flex" : "hidden"
              }`}
            >
              <div className="flex flex-col w-full md:hidden">
                <NavbarItems />
              </div>

              <button
                onClick={() => {
                  removeToken();
                  navigate(ROUTES.LOGIN);
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-red-600 hover:text-red-800`}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

const NavbarItems = () => {
  const currentPage = window.location.pathname;
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => {
          navigate("/");
        }}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-50 ${
          currentPage === ROUTES.DASHBOARD
            ? "bg-blue-100 text-blue-700"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        <Home size={16} />
        <span>Dashboard</span>
      </button>
      <button
        onClick={() => {
          navigate(ROUTES.TASKS);
        }}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-50 ${
          currentPage === ROUTES.TASKS
            ? "bg-blue-100 text-blue-700"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        <CheckSquare size={16} />
        <span>Tasks</span>
      </button>
      <button
        onClick={() => navigate(ROUTES.TEAMS)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-50 ${
          currentPage === ROUTES.TEAMS
            ? "bg-blue-100 text-blue-700"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        <Users size={16} />
        <span>Team</span>
      </button>
      <button
        onClick={() => {
          navigate("/analytics");
        }}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-50 ${
          currentPage === ROUTES.ANALYTICS
            ? "bg-blue-100  text-blue-700"
            : "text-gray-600 hover:text-gray-800"
        }`}
      >
        <BarChart3 size={16} />
        <span>Analytics</span>
      </button>
    </>
  );
};
