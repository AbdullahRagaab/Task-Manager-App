import { useState } from "react";
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useTaskModalStore } from "../stores/openModalStore";
import { useDeleteTask, useGetTasks } from "../hooks/tasksHooks";
import { ConfirmationButton } from "../../../common/ui/ConfirmationButton";
import Select from "../../../common/ui/Select";
import type { TasksWithPagentation } from "../types/TaskType";
import Input from "../../../common/ui/Input";
import { useSearchParams } from "react-router-dom";
import type { TaskFiltersType } from "../types/TaskFiltersType";

const buildQueryString = (filters: TaskFiltersType) => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.priority && filters.priority !== "all") params.set("priority", filters.priority);
  if (filters.page) params.set("page", filters.page);

    params.set("page_size", "3");

  return params.toString();
};

export default function TasksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "all",
    priority: searchParams.get("priority") || "all",
    page: searchParams.get("page") || "1",
  });

  const [queryString, setQueryString] = useState(() => buildQueryString(filters));
  const { openModal } = useTaskModalStore();

  const { data: tasks, isError: isTasksError, error: tasksError } = useGetTasks<TasksWithPagentation>(queryString);

  const { mutate: deleteTask } = useDeleteTask();

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page: String(page) };
    setFilters(newFilters);

    const newQuery = buildQueryString(newFilters);
    setQueryString(newQuery);

    const newParams: Record<string, string> = {};
    if (newFilters.search) newParams.search = newFilters.search;
    if (newFilters.status !== "all") newParams.status = newFilters.status;
    if (newFilters.priority !== "all") newParams.priority = newFilters.priority;
    newParams.page = String(page);

    setSearchParams(newParams);
  };

  const handleFilters = (e: React.FormEvent) => {
    e.preventDefault();

    const newFilters = { ...filters, page: "1" };
    setFilters(newFilters);

    const newQuery = buildQueryString(newFilters);
    setQueryString(newQuery);

    const newParams: Record<string, string> = {};
    if (newFilters.search) newParams.search = newFilters.search;
    if (newFilters.status !== "all") newParams.status = newFilters.status;
    if (newFilters.priority !== "all") newParams.priority = newFilters.priority;
    newParams.page = "1";

    setSearchParams(newParams);
  };

  if (isTasksError) {
    return <>{tasksError.message}</>;
  }

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Tasks Management</h1>
          <button onClick={() => openModal("createMode")} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <Plus size={20} />
            <span>New Task</span>
          </button>
        </div>

        <form onSubmit={handleFilters} className="flex items-center bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-row gap-4 w-full">
            <div className="relative w-full">
              <Input name="search" value={filters.search} onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))} />
            </div>

            <Select
              name="status"
              value={filters.status}
              onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full"
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
              className="w-full"
              options={[
                { label: "All Priority", value: "all" },
                { label: "Low", value: "low" },
                { label: "Medium", value: "medium" },
                { label: "High", value: "high" },
                { label: "Urgent", value: "urgent" },
              ]}
            />

            <button type="submit" className="bg-blue-600 text-white w-full rounded-md">
              Apply
            </button>
          </div>
        </form>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks?.results.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-500">{task.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${task.status === "completed" ? "bg-green-100 text-green-800" : task.status === "in-progress" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{task.status.replace("-", " ")}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${task.priority === "urgent" ? "bg-red-100 text-red-800" : task.priority === "high" ? "bg-orange-100 text-orange-800" : task.priority === "medium" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>{task.priority}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{task.assignee.label}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{`${task.dueDate}`}</td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        <button onClick={() => openModal("viewMode", task)} className="text-green-600 hover:text-green-900">
                          <Eye size={16} />
                        </button>
                        <button onClick={() => openModal("editMode", task)} className="text-blue-600 hover:text-blue-900">
                          <Edit2 size={16} />
                        </button>

                        <ConfirmationButton buttonLabel="Delete" confirmTitle="Confirm Deletion" confirmMessage="Are you sure you want to delete this task? This cannot be undone." confirmText="Delete" cancelText="Cancel" onConfirm={() => deleteTask(task.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 size={16} />
                        </ConfirmationButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 fixed bottom-4 w-xlg left-5 right-5">
            <div className="flex-1 flex justify-between sm:hidden">
              <button onClick={() => {}} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                Previous
              </button>
              <button onClick={() => {}} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                {/* <p className="text-sm text-gray-700">Showing 1 to 2 of 3 results</p> */}

                  <p className="text-sm text-gray-700 ">
                    Showing {(Number(filters.page) - 1) * 3 + 1}
                    {" to "}
                    {Math.min(Number(filters.page) * 3, tasks?.count || 0)}
                    {" of "}
                    {tasks?.count || 0} results
                  </p>


              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button onClick={() => handlePageChange(Number(filters.page) - 1)} disabled={Number(filters.page) <= 1} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                    <ChevronLeft size={20} />
                  </button>
                  {Array.from({ length: tasks?.total_pages || 0 }, (_, i) => i + 1).map((page) => (
                    <button key={page} onClick={() => handlePageChange(page)} className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${filters.page === String(page) ? "z-10 bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`}>
                      {page}
                    </button>
                  ))}

                  <button onClick={() => handlePageChange(Number(filters.page) + 1)} disabled={Number(filters.page) >= (tasks?.total_pages || 1)} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                    <ChevronRight size={20} />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
