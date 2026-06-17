import prisma from "../config/prisma";
import { type TaskLabel, TaskPriority, TaskStatus, Task } from "@prisma/client";

export interface CreateTaskData {
  title: string;
  labels: TaskLabel[];
  creatorId: string;
  priority: TaskPriority;
  projectId: string;
  status?: TaskStatus;
}

export interface UpdatedTask {
  title?: string;
  assigneeId?: string;
  labels?: TaskLabel[];
  status?: TaskStatus;
  priority?: TaskPriority;
}

export interface UpdateTaskData {
  id: string;
  data: UpdatedTask;
}

export function create(data: CreateTaskData) {
  return prisma.task.create({ data });
}

export function findAll(projectId: string) {
  return prisma.task.findMany({ where: { projectId } });
}

export function findById(taskId: string) {
  return prisma.task.findFirst({ where: { id: taskId } });
}

export function update(payload: UpdateTaskData) {
  return prisma.task.update({
    where: { id: payload.id },
    data: payload.data,
  });
}

export function deleteById(id: string) {
  return prisma.task.delete({ where: { id } });
}
