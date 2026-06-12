import prisma from "../config/prisma";

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export function create(data: CreateUserData) {
  return prisma.user.create({ data });
}

export function findByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
