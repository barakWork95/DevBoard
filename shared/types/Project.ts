import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  ownerId: z.string(),
  owner: z.object({
    name: z.string(),
    email: z.string(),
  }),
  status: z.enum(["BACKLOG", "ACTIVE", "COMPLETE"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const AddMembersSchema = z.object({
  emails: z.array(z.email()),
});

export const CreateProjectSchema = z.object({
  name: z.string().min(1),
  status: z.enum(["BACKLOG", "ACTIVE", "COMPLETE"]).optional(),
});

export const UpdateProjectSchema = z.object({
  name: z.string().min(1).optional(),
  status: z.enum(["BACKLOG", "ACTIVE", "COMPLETE"]).optional(),
});

export const ProjectMemberSchema = z.object({
  id: z.string(),
  user: z.object({
    name: z.string(),
    email: z.string(),
  }),
  role: z.enum(["ADMIN", "MEMBER"]),
  createdAt: z.string().datetime(),
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectMember = z.infer<typeof ProjectMemberSchema>;
export type AddMembers = z.infer<typeof AddMembersSchema>;
export type CreateProject = z.infer<typeof CreateProjectSchema>;
export type UpdateProject = z.infer<typeof UpdateProjectSchema>;
