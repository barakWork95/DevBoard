import type { Task } from "@devboard/shared";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useDraggable } from "@dnd-kit/core";

export interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={
        transform
          ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
          : undefined
      }
      className="flex flex-col gap-5 p-5 w-[250px] cursor-pointer"
    >
      <Typography variant="h4">{task.title}</Typography>
      <div className="flex flex-col gap-3">
        <Typography variant="caption">
          <strong>Labels: </strong>
        </Typography>
        <div className="flex gap-3">
          {task.labels.map((label) => (
            <Chip key={label} label={label} variant="outlined" size="small" />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Typography variant="caption">
            <strong>Priority: </strong>
          </Typography>
          <Chip label={task.priority} size="small" className="w-max" />
        </div>
      </div>
    </Card>
  );
}
