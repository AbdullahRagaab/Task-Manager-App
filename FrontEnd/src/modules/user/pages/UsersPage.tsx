import { useGetTasks } from "../../tasks/hooks/tasksHooks";
import { type TaskType } from "../../tasks/types/TaskType";
import { useGetUsers } from "../hooks/UsersHooks";
import { useUserModelStore } from "../stores/userModelStore";
import type { UsersWithPagination } from "../types/UserType";
import { Image, SquarePen, User } from "lucide-react";

export default function UsersPage() {
  const { openUserModal, openProfileModal } = useUserModelStore();
  const { data: users } = useGetUsers<UsersWithPagination>();
  const { data: tasks } = useGetTasks<TaskType[]>("page_size=all");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Team Members</h1>
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
          <Plus size={20} />
          <span>New Task</span>
        </button> */}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users?.results?.map((user) => {
            const userTasks =
              tasks?.filter((task) => task.assignee.value === user.id) || [];
            const completedTasks =
              userTasks?.filter((task) => task.status === "completed").length ||
              0;

            return (
              <div
                key={user.id}
                className="group bg-white overflow-hidden hover:bg-blue-100 p-6 rounded-xl border border-gray-200 transition-colors duration-300 ease-in-out"
              >
                <div className="relative  flex items-center justify-between space-x-4 mb-4">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {user.full_name}
                      </h3>
                      <p className="text-sm text-gray-600">@{user.username}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center absolute right-[-100%] group-hover:right-[-5%] transition-all duration-300 ease-in-out">
                    <button
                      className=" text-white cursor-pointer p-[12px] bg-yellow-300 rounded-full"
                      onClick={() => openUserModal("editMode", user)}
                    >
                      <SquarePen />
                    </button>
                    <button
                      className="text-white cursor-pointer p-[12px] bg-green-400 rounded-full"
                      onClick={() => openProfileModal(user)}
                    >
                      <Image />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Role:</span>
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tasks:</span>
                    <span className="text-sm font-medium">
                      {userTasks.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Completed:</span>
                    <span className="text-sm font-medium text-green-600">
                      {completedTasks}
                    </span>
                  </div>
                </div>

                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        userTasks.length > 0
                          ? (completedTasks / userTasks.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {userTasks.length > 0
                    ? Math.round((completedTasks / userTasks.length) * 100)
                    : 0}
                  % completion rate
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
