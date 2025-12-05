import { Check, Clock, Eye, ListTodo, Loader2 } from "lucide-react";
import { useGetCurrentUser } from "../hooks/useGetCurrentUser";
import { useGetTasks } from "../../../src/modules/tasks/hooks/tasksHooks";
import type { TaskType } from "../../modules/tasks/types/TaskType";
import { useTaskModalStore } from "../../../src/modules/tasks/stores/openModalStore";
import type { UserType } from "../../modules/user/types/UserType";

export default function Dashboard() {
  const { openModal } = useTaskModalStore();
  const { data: currentUser } = useGetCurrentUser<UserType>();
  const { data: tasksData, isLoading, isError, error } = useGetTasks<TaskType[]>("");

  const tasks: TaskType[] = tasksData || [];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const pendingTasks = tasks.filter(t => t.status === "pending").length;
  const inProgressTasks = tasks.filter(t => t.status === "in-progress").length;

  if (isLoading) return <div className="p-6 text-center">Loading dashboard...</div>;
  if (isError) return <div className="p-6 text-red-600">{error instanceof Error ? error.message : "Unknown error"}</div>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {currentUser?.full_name}!</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <SummaryCard title="Total Tasks" count={totalTasks} color="blue" icon={<ListTodo size={32} />} />
        <SummaryCard title="Completed" count={completedTasks} color="green" icon={<Check size={32} />} />
        <SummaryCard title="In Progress" count={inProgressTasks} color="yellow" icon={<Loader2 size={32} />} />
        <SummaryCard title="Pending" count={pendingTasks} color="red" icon={<Clock size={32} />} />
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Tasks</h2>
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No tasks found. Create your first task!</div>
        ) : (
          <RecentTasksList tasks={tasks.slice(0, 3)} openModal={openModal} />
        )}
      </div>
    </div>
  );
}


function SummaryCard({
  title,
  count,
  color,
  icon,
}: {
  title: string;
  count: number;
  color: "blue" | "green" | "yellow" | "red"; 
  icon: React.ReactNode;
}) {
  const colors = {
    blue: { bg: "bg-blue-50", text: "text-blue-800", label: "text-blue-600" },
    green: { bg: "bg-green-50", text: "text-green-800", label: "text-green-600" },
    yellow: { bg: "bg-yellow-50", text: "text-yellow-800", label: "text-yellow-600" },
    red: { bg: "bg-red-50", text: "text-red-800", label: "text-red-600" },
  };

  const c = colors[color]; 

  return (
    <div className={`${c.bg} p-6 rounded-xl border-l-4 border-${color}-500 flex justify-between items-center`}>
      <div>
        <p className={`${c.label} text-sm font-medium`}>{title}</p>
        <p className={`text-3xl font-bold ${c.text}`}>{count}</p>
      </div>
      {icon}
    </div>
  );
}



function RecentTasksList({
  tasks,
  openModal,
}: {
  tasks: TaskType[];
  openModal: (mode: "editMode" | "createMode" | "viewMode" | null, task?: TaskType | null) => void;
}) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div>
            <h3 className="font-medium">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
          <div className="flex items-center gap-2">
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
  );
}
