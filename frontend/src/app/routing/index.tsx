import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoute } from "./PublicRoutes";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "../views/auth/LoginPage";
import RegisterPage from "../views/auth/RegisterPage";
import AppLayout from "../components/AppLayout";
import ProjectsPage from "../views/projects/ProjectsPage";

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
            <Route path="/" element={<div>Dashboard</div>} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
