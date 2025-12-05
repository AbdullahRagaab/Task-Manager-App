/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useTaskModalStore } from "../stores/openModalStore";
import { useDeleteTask, useGetTasks } from "../hooks/tasksHooks";
import Input from "../../../common/ui/Input";
import Select from "../../../common/ui/Select";

const LIMIT = 3;

const buildQueryString = (filters: any) => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.priority && filters.priority !== "all") params.set("priority", filters.priority);
  if (filters.page) params.set("page", filters.page);

  params.set("limit", String(LIMIT));

  return params.toString();
};

export default function TasksPage() {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    priority: "all",
    page: "1",
  });

  const [queryString, setQueryString] = useState(buildQueryString(filters));

  const { openModal } = useTaskModalStore();

  const { data: tasksData } = useGetTasks(queryString);
  const { mutate: deleteTask } = useDeleteTask();

  // MockAPI بيرجع array مباشرة
  const tasks = Array.isArray(tasksData) ? tasksData : [];

  /* ---------------------------- Paging ---------------------------- */
  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page: String(page) };
    setFilters(newFilters);
    setQueryString(buildQueryString(newFilters));
  };

  /* ---------------------------- Filters ---------------------------- */
  const handleFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const newFilters = { ...filters, page: "1" };
    setFilters(newFilters);
    setQueryString(buildQueryString(newFilters));
  };

  return (
    <div className="p-6">
      {/* ------------------------- Header ------------------------- */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tasks Management</h1>
        <button
          onClick={() => openModal("createMode")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>New Task</span>
        </button>
      </div>

      {/* ------------------------- Filters ------------------------- */}
      <form onSubmit={handleFilters} className="flex items-center bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-row gap-4 w-full">
          <Input
            name="search"
            value={filters.search}
            placeholder="Search..."
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          />

          <Select
            name="status"
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
            options={[
              { label: "All Status", value: "all" },
              { label: "Pending", value: "pending" },
              { label: "In Progress", value: "in-progress" },
              { label: "Completed", value: "completed" },
            ]}
          />

          <Select
            name="priority"
            value={filters.priority}
            onChange={(e) => setFilters((prev) => ({ ...prev, priority: e.target.value }))}
            options={[
              { label: "All Priority", value: "all" },
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
              { label: "Urgent", value: "urgent" },
            ]}
          />

          <button type="submit" className="bg-blue-600 text-white w-full rounded-md py-2">
            Apply
          </button>
        </div>
      </form>

      {/* ------------------------- Table ------------------------- */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task: any) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-500">{task.description}</div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : task.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        task.priority === "urgent"
                          ? "bg-red-100 text-red-800"
                          : task.priority === "high"
                          ? "bg-orange-100 text-orange-800"
                          : task.priority === "medium"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm font-medium flex gap-2">
                    <button onClick={() => openModal("viewMode", task)} className="text-green-600 hover:text-green-900">
                      <Eye size={16} />
                    </button>

                    <button onClick={() => openModal("editMode", task)} className="text-blue-600 hover:text-blue-900">
                      <Edit2 size={16} />
                    </button>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ------------------------- Pagination ------------------------- */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <button
            onClick={() => handlePageChange(Number(filters.page) - 1)}
            disabled={Number(filters.page) <= 1}
            className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => handlePageChange(Number(filters.page) + 1)}
            disabled={tasks.length < LIMIT}
            className="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
