import axiosInstance from "../../lib/axios";
import type { CreateTask } from "@devboard/shared";

export function createTask(data: CreateTask) {
  return axiosInstance.post("/api/tasks", data);
}

export function updateTaskStatus(
  taskId: string,
  data: { projectId: string; status: string },
) {
  return axiosInstance.patch(`/api/tasks/${taskId}/status`, data);
}
