import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoute } from "./PublicRoutes";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "../views/auth/LoginPage";
import RegisterPage from "../views/auth/RegisterPage";
import AppLayout from "../components/AppLayout";
import ProjectsPage from "../views/projects/ProjectsPage";
import ProjectDetailPage from "../views/projects/ProjectDetailPage";
import TaskDetailsPage from "../views/task-details/TaskDetailsPage";
import DashboardPage from "../views/dashboard/DashboardPage";

export const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route
              path="/projects/:id/tasks/:taskId"
              element={<TaskDetailsPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
