import type { Task } from "@devboard/shared";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useMemo } from "react";
import { TaskStatuses } from "../../core/constants";
import KanbanColumn from "./KanbanColumn";
import { useUpdateTaskStatus } from "../../core/hooks/useTask";

export interface KanbanBoardProps {
  projectId: string;
  tasks: Task[];
}

export default function KanbanBoard({ projectId, tasks }: KanbanBoardProps) {
  const { mutate } = useUpdateTaskStatus(projectId);
  const tasksByStatus = useMemo(() => {
    const map = new Map<string, Task[]>();
    TaskStatuses.forEach((status) => map.set(status, []));
    tasks.forEach((task) => map.get(task.status)?.push(task));
    return map;
  }, [tasks]);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log("active:", active, "over:", over);
    const task = tasks.find((t) => t.id === active.id);
    if (!over || task?.status === over.id) return;
    mutate({ taskId: active.id as string, status: over.id as string });
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex justify-center gap-1">
        {Object.values(TaskStatuses).map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={tasksByStatus.get(status) ?? []}
          />
        ))}
      </div>
    </DndContext>
  );
}
