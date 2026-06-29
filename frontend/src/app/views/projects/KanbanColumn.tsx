import type { Task } from "@devboard/shared";
import TaskCard from "./TaskCard";
import Typography from "@mui/material/Typography";
import { useDroppable } from "@dnd-kit/core";
import { StatusColors } from "../../core/constants";

export interface KanbanColumnProps {
  status: string;
  tasks: Task[];
}

const StatusLabels: Record<string, string> = {
  BACKLOG: "Backlog",
  IN_PROGRESS: "In Progress",
  CODE_REVIEW: "Code Review",
  DONE: "Done",
  RELEASED: "Released",
};

export default function KanbanColumn({ status, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const color = StatusColors[status] ?? "#6B778C";

  return (
    <div
      ref={setNodeRef}
      style={{
        minWidth: 260,
        maxWidth: 260,
        backgroundColor: isOver ? "#F0F4FF" : "#F4F5F7",
        borderRadius: 8,
        transition: "background-color 0.2s",
      }}
    >
      {/* Column header */}
      <div
        className="flex items-center justify-between px-3 py-2"
        style={{ borderBottom: `3px solid ${color}` }}
      >
        <div className="flex items-center gap-2">
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: color,
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, color: "#172B4D" }}
          >
            {StatusLabels[status] ?? status}
          </Typography>
        </div>
        <div
          style={{
            backgroundColor: color,
            color: "#fff",
            borderRadius: 10,
            padding: "1px 8px",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {tasks.length}
        </div>
      </div>

      {/* Tasks */}
      <div className="flex flex-col gap-2 p-2" style={{ minHeight: 200 }}>
        {tasks.length === 0 ? (
          <div
            className="flex items-center justify-center h-20 rounded-md"
            style={{
              border: "2px dashed #DFE1E6",
              color: "#5E6C84",
              fontSize: 13,
            }}
          >
            No tasks
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
