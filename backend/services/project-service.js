import { prisma } from "../lib/prisma.js";

async function getAllProjects(workspaceId, query = {}) {
  const { status, page = 1, limit = 10, search } = query;

  const where = { workspaceId };

  if (status) where.status = status;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { projectKey: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: {
        iconFile: true,
        _count: {
          select: {
            tasks: true,
            members: true,
            sprints: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.project.count({ where }),
  ]);

  return {
    projects,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  };
}

async function getProjectById(id) {
  return await prisma.project.findUnique({
    where: { id },
    include: {
      iconFile: true,
      workspace: {
        select: { id: true, name: true, logoUrl: true },
      },
      createdBy: {
        select: { id: true, username: true, firstName: true, lastName: true },
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
      taskStatuses: true,
      _count: {
        select: {
          tasks: true,
          sprints: true,
          documents: true,
        },
      },
    },
  });
}

async function createProject(data, userId) {
  return await prisma.project.create({
    data: {
      workspaceId: data.workspaceId,
      name: data.name,
      projectKey: data.projectKey,
      description: data.description,
      createdById: userId,
      color: data.color,
      icon: data.icon,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
      taskStatuses: {
        create: [
          {
            name: "To Do",
            orderPosition: 1,
            isDefault: true,
            category: "TODO",
            color: "#808080",
          },
          {
            name: "In Progress",
            orderPosition: 2,
            category: "IN_PROGRESS",
            color: "#4A90E2",
          },
          {
            name: "Done",
            orderPosition: 3,
            category: "DONE",
            color: "#4AE24A",
          },
        ],
      },
    },
    include: {
      taskStatuses: true,
      members: true,
    },
  });
}

async function updateProject(id, data) {
  return await prisma.project.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      status: data.status,
      color: data.color,
      icon: data.icon,
      iconFileId: data.iconFileId,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    },
  });
}

async function deleteProject(id) {
  return await prisma.project.delete({
    where: { id },
  });
}

async function getProjectMembers(projectId) {
  return await prisma.projectMember.findMany({
    where: { projectId },
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

async function addProjectMember(projectId, data) {
  return await prisma.projectMember.create({
    data: {
      projectId,
      userId: data.userId,
      role: data.role || "MEMBER",
      invitedById: data.invitedById,
    },
  });
}

async function removeProjectMember(projectId, userId) {
  return await prisma.projectMember.delete({
    where: {
      projectId_userId: { projectId, userId },
    },
  });
}

async function getTaskStatuses(projectId) {
  return await prisma.taskStatus.findMany({
    where: { projectId },
    orderBy: { orderPosition: "asc" },
  });
}

async function createTaskStatus(projectId, data) {
  const lastPosition = await prisma.taskStatus.findFirst({
    where: { projectId },
    orderBy: { orderPosition: "desc" },
  });

  return await prisma.taskStatus.create({
    data: {
      projectId,
      name: data.name,
      color: data.color,
      orderPosition: (lastPosition?.orderPosition || 0) + 1,
      category: data.category || "TODO",
    },
  });
}

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectMembers,
  addProjectMember,
  removeProjectMember,
  getTaskStatuses,
  createTaskStatus,
};
