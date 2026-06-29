import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  deleteTask,
  getTaskById,
  updateTask,
  updateTaskStatus,
} from "../services/taskService";
import type { CreateTask, Task, UpdateTask } from "@devboard/shared";
import type { AxiosResponse } from "axios";

export function useCreateTask(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTask) => createTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectTasks", projectId] });
    },
  });
}

export function useTaskById(id: string) {
  return useQuery({
    queryKey: ["taskById", id],
    queryFn: () => getTaskById(id),
  });
}

export function useUpdateTaskStatus(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    // 1. The actual API call — receives variables from mutate()
    mutationFn: ({ taskId, status }: { taskId: string; status: string }) =>
      updateTaskStatus(taskId, { projectId, status }),

    // 2. Runs BEFORE mutationFn — optimistic update happens here
    onMutate: async ({ taskId, status }) => {
      // Cancel any in-flight re-fetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({
        queryKey: ["projectTasks", projectId],
      });

      // Snapshot the current cache before we change anything
      const prev = queryClient.getQueryData(["projectTasks", projectId]);

      // Optimistically update the cache — move the card immediately
      queryClient.setQueryData(
        ["projectTasks", projectId],
        (oldResponse: AxiosResponse<Task[]>) => ({
          ...oldResponse,
          data: oldResponse.data.map((task: Task) =>
            task.id === taskId ? { ...task, status } : task,
          ),
        }),
      );

      // Return snapshot as context — available in onError for rollback
      return { prev };
    },

    // 3. Runs if mutationFn throws — roll back to snapshot
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["projectTasks", projectId], context?.prev);
    },

    // 4. Runs after success OR error — sync with server truth
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectTasks", projectId],
      });
    },
  });
}

export function useUpdateTask(taskId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateTask) => updateTask(taskId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskById", taskId] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useUpdateTaskStatusOnDetail(
  taskId: string,
  projectId: string,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: string) =>
      updateTaskStatus(taskId, { projectId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskById", taskId] });
      queryClient.invalidateQueries({ queryKey: ["projectTasks", projectId] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      taskId,
      projectId,
    }: {
      taskId: string;
      projectId: string;
    }) => deleteTask(taskId, projectId),
    onSuccess: (_data, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["projectTasks", projectId] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}
