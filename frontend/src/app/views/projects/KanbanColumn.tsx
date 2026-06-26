import type { Task } from "@devboard/shared";
import TaskCard from "./TaskCard";
import { Container, Typography } from "@mui/material";

export interface KanbanColumnProps {
  status: string;
  tasks: Task[];
}

export default function KanbanColumn({ status, tasks }: KanbanColumnProps) {
  return (
    <Container className="flex flex-col gap-2 border rounded-sm min-w-75 vh-full">
      <Typography variant="h6">
        <strong>{status}:</strong>
      </Typography>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Container>
  );
}
