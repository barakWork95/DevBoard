import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  getProjects,
  getProjectById,
  getProjectMembers,
  getProjectTasks,
} from "../services/projectService";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });
}

export function useProjectById(id: string) {
  return useQuery({
    queryKey: ["projectById", id],
    queryFn: () => getProjectById(id),
  });
}

export function useProjectMembers(id: string) {
  return useQuery({
    queryKey: ["projectMembers", id],
    queryFn: () => getProjectMembers(id),
  });
}

export function useProjectTasks(id: string) {
  return useQuery({
    queryKey: ["projectTasks", id],
    queryFn: () => getProjectTasks(id),
  });
}
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createProject(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
