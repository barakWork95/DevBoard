import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login, logout, register } from "../services/authService";
import useAuthStore from "../../store/authStore";

export function useRegister() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => register(name, email, password),
    onSuccess: (response) => {
      const { user, accessToken, refreshToken } = response.data;
      setAuth(user, accessToken, refreshToken);
      navigate("/");
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (response) => {
      const { user, accessToken, refreshToken } = response.data;
      setAuth(user, accessToken, refreshToken);
      navigate("/");
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: ({ refreshToken }: { refreshToken: string }) =>
      logout(refreshToken),
    onSuccess: () => {
      clearAuth();
      navigate("/login");
    },
  });
}
