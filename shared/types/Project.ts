import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  owner: z.string().uuid(),
  status: z.enum(["backlog", "active", "complete"]),
  members: z.array(z.string().uuid()),
  taskIds: z.array(z.string().uuid()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Project = z.infer<typeof ProjectSchema>;
