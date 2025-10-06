import { Route, Routes } from "react-router-dom";
import UsersPage from "../pages/UsersPage";
import UserPageLayout from "../layouts/UserPageLayout";

export default function UsersRouters() {
  return (
    <Routes>
      <Route element={<UserPageLayout />}>
        <Route index={true} element={<UsersPage />} />
      </Route>
    </Routes>
  );
}
