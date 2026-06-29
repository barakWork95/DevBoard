import { useQuery } from "@tanstack/react-query";
import { getStats } from "../services/statsService";

export interface StatsResponse {
  totalProjects: number;
  totalTasks: number;
  tasksByStatus: Record<string, number>;
  recentProjects: {
    id: string;
    name: string;
    status: string;
    createdAt: string;
  }[];
  recentTasks: {
    id: string;
    title: string;
    status: string;
    priority: string;
    createdAt: string;
    project: { id: string; name: string };
  }[];
}

export function useStats() {
  return useQuery<StatsResponse>({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await getStats();
      return data;
    },
  });
}
