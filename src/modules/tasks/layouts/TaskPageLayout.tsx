import { Outlet } from "react-router-dom";

export default function TaskPageLayout() {
  return (
    <div className="relative">
      <Outlet />
    </div>
  );
}
