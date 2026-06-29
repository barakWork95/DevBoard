import type { Task } from "@devboard/shared";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useDraggable } from "@dnd-kit/core";
import { useNavigate, useParams } from "react-router-dom";
import { PriorityColors } from "../../core/constants";

export interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const priorityColor = PriorityColors[task.priority] ?? "#6B778C";

  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        borderLeft: `3px solid ${priorityColor}`,
        cursor: "pointer",
      }}
      onClick={() => navigate(`/projects/${id}/tasks/${task.id}`)}
      sx={{
        "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.12)" },
      }}
    >
      <div className="flex flex-col gap-3 p-3">
        {/* Title row + drag handle */}
        <div className="flex items-start justify-between gap-2">
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "text.primary", lineHeight: 1.4 }}
          >
            {task.title}
          </Typography>
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab mt-0.5 shrink-0"
            style={{ color: "#5E6C84" }}
          >
            <DragIndicatorIcon fontSize="small" />
          </div>
        </div>

        {/* Labels */}
        {task.labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.labels.map((label) => (
              <Chip
                key={label}
                label={label}
                size="small"
                variant="outlined"
                sx={{ fontSize: 10, height: 20, borderRadius: 1 }}
              />
            ))}
          </div>
        )}

        {/* Priority */}
        <div className="flex items-center justify-between">
          <Chip
            label={task.priority}
            size="small"
            sx={{
              backgroundColor: `${priorityColor}20`,
              color: priorityColor,
              fontWeight: 600,
              fontSize: 10,
              height: 20,
              borderRadius: 1,
            }}
          />
        </div>
      </div>
    </Card>
  );
}
