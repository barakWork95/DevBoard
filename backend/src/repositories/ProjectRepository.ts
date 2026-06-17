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

interface UpdateProjectData {
  id: string;
  data: UpdatedProject;
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
