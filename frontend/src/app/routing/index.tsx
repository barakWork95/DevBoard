import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicRoute } from "./PublicRoutes";
import { ProtectedRoute } from "./ProtectedRoute";

export const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/register" element={<div>Register</div>} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<div>Dashboard</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
