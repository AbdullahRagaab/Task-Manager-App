import TaskPageLayout from "../layouts/TaskPageLayout";
import TasksPage from "../pages/TasksPage";
import type { RouteObject } from "react-router-dom";

const taskRoutes: RouteObject = {
  path: "/tasks",
  element: <TaskPageLayout />,
  children: [
    {
      index: true,
      element: <TasksPage />,
    },
  ],
};

export default taskRoutes;
