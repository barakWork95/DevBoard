import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  labels: z.array(z.enum(["FE", "BE", "DEVOPS", "QA", "UI_UX", "PM"])),
  creatorId: z.string(),
  assigneeId: z.string().optional(),
  projectId: z.string(),
  parentId: z.string().optional(),
  status: z.enum(["BACKLOG", "IN_PROGRESS", "CODE_REVIEW", "DONE", "RELEASED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  labels: z
    .array(z.enum(["FE", "BE", "DEVOPS", "QA", "UI_UX", "PM"]))
    .optional(),
  assigneeId: z.string().optional(),
  projectId: z.string(),
  parentId: z.string().optional(),
  status: z
    .enum(["BACKLOG", "IN_PROGRESS", "CODE_REVIEW", "DONE", "RELEASED"])
    .optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
});

export const UpdateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  labels: z
    .array(z.enum(["FE", "BE", "DEVOPS", "QA", "UI_UX", "PM"]))
    .optional(),
  assigneeId: z.string().optional(),
  parentId: z.string().optional(),
  status: z
    .enum(["BACKLOG", "IN_PROGRESS", "CODE_REVIEW", "DONE", "RELEASED"])
    .optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),
});

export const UpdateAssigneeSchema = z.object({
  projectId: z.string(),
  assigneeId: z.string(),
});

export const UpdateStatusSchema = z.object({
  projectId: z.string(),
  status: z.enum(["BACKLOG", "IN_PROGRESS", "CODE_REVIEW", "DONE", "RELEASED"]),
});

export type Task = z.infer<typeof TaskSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
export type UpdateAssignee = z.infer<typeof UpdateAssigneeSchema>;
export type UpdateStatus = z.infer<typeof UpdateStatusSchema>;
