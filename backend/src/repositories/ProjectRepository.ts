import prisma from "../config/prisma";
import { type ProjectStatus } from "@prisma/client";

interface CreateProjectData {
  name: string;
  ownerId: string;
}

interface UpdatedProject {
  name?: string;
  status?: ProjectStatus;
}

interface AddMembers {
  emails: string[];
}

interface UpdateProjectData {
  id: string;
  data: UpdatedProject;
}

interface AddMembersData {
  projectId: string;
  data: AddMembers;
}

export function create(data: CreateProjectData) {
  return prisma.project.create({ data });
}

export function findAll(userId: string) {
  return prisma.project.findMany({
    where: {
      OR: [{ ownerId: userId }, { members: { some: { userId } } }],
    },
  });
}

export function findById(userId: string, id: string) {
  return prisma.project.findFirst({
    where: {
      AND: [
        { id },
        { OR: [{ ownerId: userId }, { members: { some: { userId } } }] },
      ],
    },
    include: {
      owner: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });
}

export function update(payload: UpdateProjectData) {
  return prisma.project.update({
    where: { id: payload.id },
    data: payload.data,
  });
}

export function deleteById(id: string) {
  return prisma.project.delete({ where: { id } });
}

export function findMembers(projectId: string) {
  return prisma.projectMember.findMany({
    where: { projectId },
    include: {
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });
}

export async function addMembers({ projectId, data }: AddMembersData) {
  const project = await prisma.project.findFirst({ where: { id: projectId } });
  if (!project) throw new Error("Project not found");
  const users = await prisma.user.findMany({
    where: { email: { in: data.emails } },
  });
  const createData = users.map((user) => ({
    userId: user.id,
    projectId: project.id,
  }));
  return prisma.projectMember.createMany({ data: createData });
}
