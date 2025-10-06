import TaskForm from "../../modules/tasks/forms/TaskForm";
import { useTaskModalStore } from "../../modules/tasks/stores/openModalStore";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const { showTaskModal } = useTaskModalStore();
  return (
    <div className="min-h-screen relative bg-gray-100">
      {showTaskModal && <TaskForm />}
      <Navbar />
      <Outlet />
    </div>
  );
}
