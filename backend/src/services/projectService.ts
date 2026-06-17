import { type ProjectStatus } from "@prisma/client";
import * as projectRepository from "../repositories/ProjectRepository";

export async function findAll(userId: string) {
  return projectRepository.findAll(userId);
}

export async function findById(userId: string, projectId: string) {
  const project = await projectRepository.findById(userId, projectId);
  if (!project) throw new Error("Project not found");
  return project;
}

export async function create(userId: string, name: string) {
  return projectRepository.create({ ownerId: userId, name });
}

export async function update(
  userId: string,
  projectId: string,
  data: { name?: string; status?: ProjectStatus },
) {
  const project = await projectRepository.findById(userId, projectId);
  if (!project) {
    throw new Error("Project not found");
  } else if (project.ownerId !== userId) {
    throw new Error("Permission denied");
  } else {
    return await projectRepository.update({ id: projectId, data });
  }
}

export async function deleteProject(userId: string, projectId: string) {
  const project = await projectRepository.findById(userId, projectId);
  if (!project) throw new Error("Project not found");
  if (project.ownerId !== userId) throw new Error("Permission denied");
  return await projectRepository.deleteById(projectId);
}
