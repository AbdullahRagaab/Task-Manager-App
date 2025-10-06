import { useState } from "react";
import { CheckSquare, Eye } from "lucide-react";
import type { TaskType } from "../../modules/tasks/types/TaskType";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import type { UserType } from "../../modules/user/types/UserType";
import { useGetUsers } from "../../modules/user/hooks/UsersHooks";
import { useGetTasks } from "../../modules/tasks/hooks/tasksHooks";
import { useTaskModalStore } from "../../modules/tasks/stores/openModalStore";

export default function Dashboard() {
  const { openModal } = useTaskModalStore();
  const { data: currentUser } = useGetCurrentUser<UserType>();

  const { data: tasks } = useGetTasks<TaskType[]>("page_size=all");
  const totalTasks = tasks?.length;
  const completedTasks = tasks?.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = tasks?.filter(
    (task) => task.status === "pending"
  ).length;
  const inProgressTasks = tasks?.filter(
    (task) => task.status === "in-progress"
  ).length;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {currentUser?.full_name}! Here's your project overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Tasks</p>
              <p className="text-3xl font-bold text-blue-800">{totalTasks}</p>
            </div>
            <CheckSquare className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-800">
                {completedTasks}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold text-yellow-800">
                {inProgressTasks}
              </p>
            </div>
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">⟳</span>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-red-800">{pendingTasks}</p>
            </div>
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">!</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Tasks</h2>
        <div className="space-y-3">
          {tasks?.slice(0, 3).map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : task.status === "in-progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {task.status.replace("-", " ")}
                </span>
                <button
                  onClick={() => openModal("viewMode", task)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
