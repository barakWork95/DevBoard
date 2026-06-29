export const TaskStatuses = [
  "BACKLOG",
  "IN_PROGRESS",
  "CODE_REVIEW",
  "DONE",
  "RELEASED",
];

export const TaskPriorities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

export const TaskLabels = ["FE", "BE", "DEVOPS", "QA", "UI_UX", "PM"];

export const StatusColors: Record<string, string> = {
  BACKLOG: "#6B778C",
  IN_PROGRESS: "#0052CC",
  CODE_REVIEW: "#6554C0",
  DONE: "#00875A",
  RELEASED: "#00B8D9",
};

export const PriorityColors: Record<string, string> = {
  LOW: "#6B778C",
  MEDIUM: "#FF991F",
  HIGH: "#FF7452",
  CRITICAL: "#DE350B",
};
