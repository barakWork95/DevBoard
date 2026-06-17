import * as taskRepository from "../repositories/TaskRepository";
import * as projectRepository from "../repositories/ProjectRepository";
import { type TaskStatus } from "@prisma/client";

export async function findAll(userId: string, projectId: string) {
  const project = await projectRepository.findById(userId, projectId);
  if (!project) throw new Error("Project not found");
  return await taskRepository.findAll(project.id);
}

export async function findById(taskId: string) {
  const task = await taskRepository.findById(taskId);
  if (!task) throw new Error("Task not found");
  return task;
}

export async function create(
  userId: string,
  projectId: string,
  data: taskRepository.CreateTaskData,
) {
  const project = await projectRepository.findById(userId, projectId);
  if (!project) throw new Error("Project not found");
  return taskRepository.create({ ...data, creatorId: userId });
}

export async function update(
  userId: string,
  projectId: string,
  data: taskRepository.UpdateTaskData,
) {
  const project = await projectRepository.findById(userId, projectId);
  if (!project) throw new Error("Project not found");
  return await taskRepository.update(data);
}

export async function updateAssignee(
  userId: string,
  projectId: string,
  taskId: string,
  assigneeId: string,
) {
  const project = await projectRepository.findById(userId, projectId);
  const task = await taskRepository.findById(taskId);
  if (!project) throw new Error("Project not found");
  if (!task) throw new Error("Project not found");
  return await taskRepository.update({ id: task.id, data: { assigneeId } });
}

export async function updateStatus(
  userId: string,
  projectId: string,
  taskId: string,
  status: TaskStatus,
) {
  const project = await projectRepository.findById(userId, projectId);
  const task = await taskRepository.findById(taskId);
  if (!project) throw new Error("Project not found");
  if (!task) throw new Error("Project not found");
  return await taskRepository.update({ id: task.id, data: { status } });
}

export async function deleteTask(
  userId: string,
  projectId: string,
  taskId: string,
) {
  const project = await projectRepository.findById(userId, projectId);
  const task = await taskRepository.findById(taskId);
  if (!project || !task) throw new Error("Project not found");
  if (project.ownerId !== userId && task.creatorId !== userId)
    throw new Error("Permission denied");
  return await taskRepository.deleteById(taskId);
}
