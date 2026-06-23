import axiosInstance from "../../lib/axios";
import type { Project } from "@devboard/shared";

type updateProjectData = Pick<Project, "name" | "status">;

export function getProjects() {
  return axiosInstance.get("/api/projects");
}

export function getProjectById(id: string) {
  return axiosInstance.get(`/api/projects/${id}`);
}

export function createProject(name: string) {
  return axiosInstance.post("/api/projects", { name });
}

export function updateProject(id: string, data: updateProjectData) {
  return axiosInstance.patch(`/api/projects/${id}`, data);
}

export function deleteProject(id: string) {
  return axiosInstance.delete(`/api/projects/${id}`);
}
