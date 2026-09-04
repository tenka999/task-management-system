import { prisma } from "../lib/prisma.js";

async function getAllWorkspaces(userId, query = {}) {
  const { page = 1, limit = 10, type, status } = query;

  const where = {
    members: {
      some: { userId },
    },
  };

  if (type) where.type = type;
  if (status) where.status = status;

  const [workspaces, total] = await Promise.all([
    prisma.workspace.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: {
        logoFile: true,
        _count: {
          select: {
            members: true,
            projects: true,
            tasks: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.workspace.count({ where }),
  ]);

  return {
    workspaces,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  };
}

async function getWorkspaceById(id) {
  return await prisma.workspace.findUnique({
    where: { id },
    include: {
      logoFile: true,
      owner: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
      members: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              avatarUrl: true,
            },
          },
        },
      },
      workspaceSettings: true,
      _count: {
        select: {
          projects: true,
          tasks: true,
          documents: true,
          labels: true,
        },
      },
    },
  });
}

async function createWorkspace(data, userId) {
  return await prisma.workspace.create({
    data: {
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/\s+/g, "-"),
      description: data.description,
      type: data.type || "TEAM",
      ownerId: userId,
      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
      workspaceSettings: {
        create: {},
      },
    },
    include: {
      members: true,
      workspaceSettings: true,
    },
  });
}

async function updateWorkspace(id, data) {
  return await prisma.workspace.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      logoUrl: data.logoUrl,
      logoFileId: data.logoFileId,
      status: data.status,
      type: data.type,
    },
  });
}

async function deleteWorkspace(id) {
  return await prisma.workspace.delete({
    where: { id },
  });
}

async function getWorkspaceMembers(workspaceId) {
  return await prisma.workspaceMember.findMany({
    where: { workspaceId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
    },
  });
}

async function addWorkspaceMember(workspaceId, data) {
  return await prisma.workspaceMember.create({
    data: {
      workspaceId,
      userId: data.userId,
      role: data.role || "MEMBER",
      invitedById: data.invitedById,
    },
  });
}

async function updateWorkspaceMember(workspaceId, userId, data) {
  return await prisma.workspaceMember.update({
    where: {
      workspaceId_userId: { workspaceId, userId },
    },
    data: {
      role: data.role,
      isActive: data.isActive,
    },
  });
}

async function removeWorkspaceMember(workspaceId, userId) {
  return await prisma.workspaceMember.delete({
    where: {
      workspaceId_userId: { workspaceId, userId },
    },
  });
}

async function inviteMember(workspaceId, data, invitedById) {
  return await prisma.workspaceInvitation.create({
    data: {
      workspaceId,
      email: data.email,
      role: data.role || "MEMBER",
      invitedById,
      token: crypto.randomUUID(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
}

export default {
  getAllWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  getWorkspaceMembers,
  addWorkspaceMember,
  updateWorkspaceMember,
  removeWorkspaceMember,
  inviteMember,
};
