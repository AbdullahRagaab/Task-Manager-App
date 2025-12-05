import type { TaskType } from "../../modules/tasks/types/TaskType";
import type { UserType } from "../../modules/user/types/UserType";
import { useGetUsers } from "../../modules/user/hooks/UsersHooks";
import { useGetTasks } from "../../modules/tasks/hooks/tasksHooks";
import { Users, BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  // Users
  const { data: usersResponse } = useGetUsers<UserType[]>("users");
  const users: UserType[] = Array.isArray(usersResponse) ? usersResponse : [];

  // Tasks
  
  const { data: tasksResponse } = useGetTasks<TaskType[]>("tasks");

  const tasks: TaskType[] = tasksResponse ?? [];



  const totalTasks = tasks.length;

  const statusData = [
    { name: "Completed", value: tasks.filter((t) => t.status === "completed").length, color: "#10b981" },
    { name: "In Progress", value: tasks.filter((t) => t.status === "in-progress").length, color: "#f59e0b" },
    { name: "Pending", value: tasks.filter((t) => t.status === "pending").length, color: "#ef4444" },
  ];

  const priorityData = [
    { name: "Urgent", value: tasks.filter((t) => t.priority === "urgent").length, color: "#dc2626" },
    { name: "High", value: tasks.filter((t) => t.priority === "high").length, color: "#ea580c" },
    { name: "Medium", value: tasks.filter((t) => t.priority === "medium").length, color: "#2563eb" },
    { name: "Low", value: tasks.filter((t) => t.priority === "low").length, color: "#64748b" },
  ];

  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const highPriorityTasks = tasks.filter((t) => t.priority === "urgent" || t.priority === "high").length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tasks by Status */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Tasks by Status</h2>
          <div className="space-y-4">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{item.value} tasks</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: item.color,
                        width: `${totalTasks > 0 ? (item.value / totalTasks) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">
                    {totalTasks > 0 ? Math.round((item.value / totalTasks) * 100) : 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks by Priority */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Tasks by Priority</h2>
          <div className="space-y-4">
            {priorityData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{item.value} tasks</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: item.color,
                        width: `${totalTasks > 0 ? (item.value / totalTasks) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">
                    {totalTasks > 0 ? Math.round((item.value / totalTasks) * 100) : 0}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Counters */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Average Completion Rate</p>
              <p className="text-3xl font-bold">{totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%</p>
            </div>
            <BarChart3 size={32} className="text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">High Priority Tasks</p>
              <p className="text-3xl font-bold">{highPriorityTasks}</p>
            </div>
            <div className="text-green-200">⚡</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Active Team Members</p>
              <p className="text-3xl font-bold">{users?.length || 0}</p>
            </div>
            <Users size={32} className="text-purple-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
