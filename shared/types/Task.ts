import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  labels: z.array(z.enum(["FE", "BE", "DevOps", "QA", "UI/UX", "PM"])),
  creator: z.string().uuid(),
  assignee: z.string().uuid(),
  projectId: z.string().uuid(),
  parent: z.string().uuid().optional(),
  status: z.enum(["backlog", "in-progress", "code-review", "done", "released"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Task = z.infer<typeof TaskSchema>;
