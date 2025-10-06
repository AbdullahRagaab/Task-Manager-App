import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import AnalyticsPage from "../pages/AnalyticsPage";
import LoginPage from "../../modules/auth/pages/LoginPage";
import SignupPage from "../../modules/auth/pages/SignUpPage";
import taskRoutes from "../../modules/tasks/routers/TaskRouters";
import UsersRouters from "../../modules/user/routers/UsersRouters";
import ProtectedRoute from "../../modules/auth/Routers/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "teams", element: <UsersRouters /> },
      taskRoutes,
    ],
  },
  { path: "login", element: <LoginPage /> },
  { path: "signup", element: <SignupPage /> },
]);

export default router;
