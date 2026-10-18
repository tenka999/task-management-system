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
        workspace: true,
        members: {
          include: {
            user: true,
          },
        },
        labels: {
          include: {
            label: true,
          },
        },
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
      workspace: true,
      labels: {
        include: {
          label: true,
        },
      },
      members: {
        include: {
          user: true,
        },
      },
      tasks: true,
      activityLogs: true,
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
      status: data.status,
      priority: data.priority,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      isPublic: data.isPublic,
      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
      labels: {
        createMany: {
          data: data.labels,
        },
      },
    },
    include: {
      members: true,
      labels: true,
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
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    },
  });
}

async function updateProjectPriority(id, data) {
  return await prisma.project.update({
    where: { id },
    data: { priority: data.priority },
  });
}

async function updateProjectStatus(id, data) {
  return await prisma.project.update({
    where: { id },
    data: { status: data.status },
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
  updateProjectStatus,
  updateProjectPriority,
  deleteProject,
  getProjectMembers,
  addProjectMember,
  removeProjectMember,
  getTaskStatuses,
  createTaskStatus,
};
