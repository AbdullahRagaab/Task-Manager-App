import { LogOut, Home, CheckSquare, Users, BarChart3, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useState } from "react";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import type { UserType } from "../../modules/user/types/UserType";
import { useAuthStore } from "../../modules/auth/stores/useAuthStore";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const currentUser = useGetCurrentUser<UserType>();
  const { removeToken } = useAuthStore();

  const handleLogout = () => {
    removeToken();
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">TaskManager</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavbarItems navigate={navigate} />
          </div>

          {/* User Profile + Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={currentUser?.data?.profile_picture || "https://i.pravatar.cc/150"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="hidden sm:block text-sm text-gray-600">
                  {currentUser?.data?.full_name || "User"}
                </span>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavbarItems navigate={navigate} setMenuOpen={setMenuOpen} />
          </div>
        </div>
      )}
    </nav>
  );
}

// Desktop Navigation Items
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NavbarItems = ({ navigate }: { navigate: any }) => {
  const currentPage = window.location.pathname;

  const navItems = [
    { label: "Dashboard", icon: Home, path: ROUTES.DASHBOARD },
    { label: "Tasks", icon: CheckSquare, path: ROUTES.TASKS },
    { label: "Team", icon: Users, path: ROUTES.TEAMS },
    { label: "Analytics", icon: BarChart3, path: ROUTES.ANALYTICS },
  ];

  return (
    <>
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-50 transition ${
            currentPage === item.path
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <item.icon size={16} />
          <span>{item.label}</span>
        </button>
      ))}
    </>
  );
};

// Mobile Navigation Items
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MobileNavbarItems = ({ navigate, setMenuOpen }: any) => {
  const currentPage = window.location.pathname;

  const navItems = [
    { label: "Dashboard", icon: Home, path: ROUTES.DASHBOARD },
    { label: "Tasks", icon: CheckSquare, path: ROUTES.TASKS },
    { label: "Team", icon: Users, path: ROUTES.TEAMS },
    { label: "Analytics", icon: BarChart3, path: ROUTES.ANALYTICS },
  ];

  return (
    <>
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => {
            navigate(item.path);
            setMenuOpen(false);
          }}
          className={`flex items-center w-full space-x-3 px-3 py-2 rounded-md transition ${
            currentPage === item.path
              ? "bg-blue-100 text-blue-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </button>
      ))}
    </>
  );
};