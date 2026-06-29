import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../services/taskService";
import type { CreateTask } from "@devboard/shared";

export function useCreateTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTask) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectTasks", projectId] });
    },
  });
}
