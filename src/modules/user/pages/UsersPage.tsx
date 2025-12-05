import { useGetTasks } from "../../tasks/hooks/tasksHooks";
import { type TaskType } from "../../tasks/types/TaskType";
import { useGetUsers } from "../hooks/UsersHooks";
import { useUserModelStore } from "../stores/userModelStore";
import type { UsersWithPagination, UserType } from "../types/UserType";
import { Image, SquarePen, User } from "lucide-react";

export default function UsersPage() {
  const { openUserModal, openProfileModal } = useUserModelStore();
  const { data: usersData, isLoading: usersLoading, isError: usersError, error: usersFetchError } = useGetUsers<UsersWithPagination>();
  const { data: tasksData, isLoading: tasksLoading, isError: tasksError, error: tasksFetchError } = useGetTasks<TaskType[]>("tasks");

  const users: UserType[] = Array.isArray(usersData) ? usersData : usersData?.results ?? [];
  const tasks = tasksData ?? [];

  if (usersLoading || tasksLoading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 animate-pulse bg-gray-200 h-8 w-48 rounded"></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-gray-100 animate-pulse h-64"></div>
          ))}
        </div>
      </div>
    );
  }

  if (usersError) return <div className="p-6 text-red-600">Error loading users: {String(usersFetchError)}</div>;
  if (tasksError) return <div className="p-6 text-red-600">Error loading tasks: {String(tasksFetchError)}</div>;

console.log("usersData:", usersData);
console.log("tasksData:", tasksData);




  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Team Members</h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => {
            // const userId = String(user.id);
            const userTasks = tasks.filter(task => String(task.assignee) === String(user.id));
            const completedTasks = userTasks.filter(task => task.status === "completed").length;
            const completionRate = userTasks.length > 0 ? Math.round((completedTasks / userTasks.length) * 100) : 0;

            return (
              <div key={user.id} className="group bg-white overflow-hidden hover:bg-blue-100 p-6 rounded-xl border border-gray-200 transition-colors duration-300 ease-in-out">
                <div className="relative flex items-center justify-between space-x-4 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{user.full_name}</h3>
                      <p className="text-sm text-gray-600">@{user.username}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 items-center absolute right-[-100%] group-hover:right-[-5%] transition-all duration-300 ease-in-out">
                    <button
                      className="text-white cursor-pointer p-[12px] bg-yellow-300 rounded-full"
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
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tasks:</span>
                    <span className="text-sm font-medium">{userTasks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Completed:</span>
                    <span className="text-sm font-medium text-green-600">{completedTasks}</span>
                  </div>
                </div>

                <div className="mt-4 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${completionRate}%` }} />
                </div>
                <p className="text-xs text-gray-500 mt-1">{completionRate}% completion rate</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

