import prisma from "../config/prisma";

export async function getStats(userId: string) {
  // Step 1: get all project IDs the user has access to
  const userProjects = await prisma.project.findMany({
    where: {
      OR: [{ ownerId: userId }, { members: { some: { userId } } }],
    },
    select: { id: true, name: true, status: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  const projectIds = userProjects.map((p) => p.id);

  // Step 2: run remaining queries in parallel
  const [totalTasks, tasksByStatusRaw, recentTasks] = await Promise.all([
    prisma.task.count({
      where: { projectId: { in: projectIds } },
    }),

    prisma.task.groupBy({
      by: ["status"],
      where: { projectId: { in: projectIds } },
      _count: { status: true },
    }),

    prisma.task.findMany({
      where: { projectId: { in: projectIds } },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        status: true,
        priority: true,
        createdAt: true,
        project: { select: { id: true, name: true } },
      },
    }),
  ]);

  // Step 3: shape tasksByStatus into a plain object
  const tasksByStatus = tasksByStatusRaw.reduce(
    (acc, row) => {
      acc[row.status] = row._count.status;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    totalProjects: userProjects.length,
    totalTasks,
    tasksByStatus,
    recentProjects: userProjects.slice(0, 3),
    recentTasks,
  };
}
