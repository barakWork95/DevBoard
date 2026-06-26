import type { Task } from "@devboard/shared";
import { useMemo } from "react";
import { TaskStatuses } from "../../core/constants";
import KanbanColumn from "./KanbanColumn";

export interface KanbanBoardProps {
  tasks: Task[];
}

export default function KanbanBoard({ tasks }: KanbanBoardProps) {
  const tasksByStatus = useMemo(() => {
    const map = new Map<string, Task[]>();
    TaskStatuses.forEach((status) => map.set(status, []));
    tasks.forEach((task) => map.get(task.status)?.push(task));
    return map;
  }, [tasks]);
  return (
    <div className="flex justify-center gap-1">
      {Object.values(TaskStatuses).map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasksByStatus.get(status) ?? []}
        />
      ))}
    </div>
  );
}
