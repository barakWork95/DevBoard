import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

export const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.accessToken);
  if (!token) return <Navigate to="/login" />;
  return <Outlet />;
};
