import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  owner: z.string(),
  status: z.enum(["BACKLOG", "ACTIVE", "COMPLETE"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateProjectSchema = z.object({
  name: z.string().min(1),
  status: z.enum(["BACKLOG", "ACTIVE", "COMPLETE"]).optional(),
});

export const UpdateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  status: z.enum(["BACKLOG", "ACTIVE", "COMPLETE"]).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type CreateProject = z.infer<typeof CreateProjectSchema>;
export type UpdateProject = z.infer<typeof UpdateProjectSchema>;
