import axiosInstance from "../../lib/axios";

export function getStats() {
  return axiosInstance.get("/api/stats");
}
