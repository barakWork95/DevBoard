import axiosInstance from "../../lib/axios";
import type { CreateTask, UpdateTask } from "@devboard/shared";

export function createTask(data: CreateTask) {
  return axiosInstance.post("/api/tasks", data);
}

export function updateTask(data: UpdateTask) {
  return axiosInstance.patch("/api/tasks", data);
}
