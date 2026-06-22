import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

export const PublicRoute = () => {
  const token = useAuthStore((state) => state.accessToken);
  if (token) return <Navigate to="/" />;
  return <Outlet />;
};
