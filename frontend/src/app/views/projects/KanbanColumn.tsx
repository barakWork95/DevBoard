import type { Task } from "@devboard/shared";
import TaskCard from "./TaskCard";
import { Container, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";

export interface KanbanColumnProps {
  status: string;
  tasks: Task[];
}

export default function KanbanColumn({ status, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <Container
      ref={setNodeRef}
      className={`flex flex-col gap-2 border rounded-sm min-w-75 vh-full transition-colors ${
        isOver ? "bg-blue-50" : ""
      }`}
    >
      <Typography variant="h6">
        <strong>{status}:</strong>
      </Typography>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Container>
  );
}
