import axiosInstance from "../../lib/axios";
import type { CreateTask, UpdateTask } from "@devboard/shared";

export function createTask(data: CreateTask) {
  return axiosInstance.post("/api/tasks", data);
}

export function updateTask(id: string, data: UpdateTask) {
  return axiosInstance.patch(`/api/tasks/${id}`, data);
}

export function updateTaskStatus(
  taskId: string,
  data: { projectId: string; status: string },
) {
  return axiosInstance.patch(`/api/tasks/${taskId}/status`, data);
}

export function deleteTask(id: string, projectId: string) {
  return axiosInstance.delete(`/api/tasks/${id}`, { data: { projectId } });
}

export function getTaskById(id: string) {
  return axiosInstance.get(`/api/tasks/${id}`);
}
