import { prisma } from "../lib/prisma.js";

async function getAllUsers(query = {}) {
  const { search, workspaceId, isActive, page = 1, limit = 10 } = query;

  const where = {};

  if (search) {
    where.OR = [
      { username: { contains: search } },
      { email: { contains: search } },
      { firstName: { contains: search } },
      { lastName: { contains: search } },
    ];
  }

  if (isActive !== undefined) {
    where.isActive = isActive === "true";
  }

  if (workspaceId) {
    where.workspaceMembers = {
      some: { workspaceId },
    };
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: {
        avatarFile: true,
        workspaceMembers: {
          include: {
            workspace: {
              select: { id: true, name: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  };
}

async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      avatarFile: true,
      preferences: true,
      workspaceMembers: {
        include: {
          workspace: {
            select: { id: true, name: true, logoUrl: true },
          },
        },
      },
      projectMembers: {
        include: {
          project: {
            select: { id: true, name: true, projectKey: true },
          },
        },
      },
    },
  });
}

async function updateUser(id, data) {
  return await prisma.user.update({
    where: { id },
    data: {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      avatarUrl: data.avatarUrl,
      avatarFileId: data.avatarFileId,
    },
  });
}

async function updatePassword(id, data) {
  const bcrypt = await import("bcrypt");
  const hashedPassword = await bcrypt.hash(data.newPassword, 10);

  return await prisma.user.update({
    where: { id },
    data: { passwordHash: hashedPassword },
  });
}

async function deactivateUser(id) {
  return await prisma.user.update({
    where: { id },
    data: { isActive: false },
  });
}

async function deleteUser(id) {
  return await prisma.user.delete({
    where: { id },
  });
}

export default {
  getAllUsers,
  getUserById,
  updateUser,
  updatePassword,
  deactivateUser,
  deleteUser,
};
