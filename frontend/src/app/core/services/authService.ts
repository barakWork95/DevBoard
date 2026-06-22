import axiosInstance from "../../lib/axios";

export function register(name: string, email: string, password: string) {
  const payload = { name, email, password };
  return axiosInstance.post("/api/auth/register", payload);
}

export function login(email: string, password: string) {
  const payload = { email, password };
  return axiosInstance.post("/api/auth/login", payload);
}

export function logout(refreshToken: string) {
  return axiosInstance.post("/api/auth/logout", { refreshToken });
}
