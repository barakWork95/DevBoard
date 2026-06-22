import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoute } from "./PublicRoutes";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "../views/auth/LoginPage";
import RegisterPage from "../views/auth/RegisterPage";

export const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<div>Dashboard</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
