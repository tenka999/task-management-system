import { prisma } from "../lib/prisma.js";

async function getAllSprints(projectId) {
  return await prisma.sprint.findMany({
    where: { projectId },
    include: {
      createdBy: {
        select: { id: true, username: true, firstName: true, lastName: true },
      },
      tasks: {
        include: {
          status: true,
          assignee: {
            select: { id: true, username: true, avatarUrl: true },
          },
        },
      },
      _count: {
        select: { tasks: true },
      },
    },
    orderBy: { startDate: "desc" },
  });
}

async function getSprintById(id) {
  return await prisma.sprint.findUnique({
    where: { id },
    include: {
      project: {
        select: { id: true, name: true, projectKey: true },
      },
      createdBy: {
        select: { id: true, username: true, firstName: true, lastName: true },
      },
      tasks: {
        include: {
          status: true,
          priority: true,
          assignee: {
            select: { id: true, username: true, avatarUrl: true },
          },
          labels: {
            include: { label: true },
          },
        },
        orderBy: { taskNumber: "asc" },
      },
    },
  });
}

async function createSprint(projectId, data, userId) {
  return await prisma.sprint.create({
    data: {
      projectId,
      name: data.name,
      goal: data.goal,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      createdById: userId,
      isActive: data.isActive || false,
    },
    include: {
      tasks: true,
    },
  });
}

async function updateSprint(id, data) {
  return await prisma.sprint.update({
    where: { id },
    data: {
      name: data.name,
      goal: data.goal,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      isActive: data.isActive,
    },
  });
}

async function deleteSprint(id) {
  return await prisma.sprint.delete({
    where: { id },
  });
}

async function addTaskToSprint(sprintId, taskId) {
  return await prisma.task.update({
    where: { id: taskId },
    data: { sprintId: parseInt(sprintId) },
  });
}

async function removeTaskFromSprint(taskId) {
  return await prisma.task.update({
    where: { id: taskId },
    data: { sprintId: null },
  });
}

async function completeSprint(id) {
  return await prisma.sprint.update({
    where: { id },
    data: {
      isActive: false,
      completedAt: new Date(),
    },
  });
}

export default {
  getAllSprints,
  getSprintById,
  createSprint,
  updateSprint,
  deleteSprint,
  addTaskToSprint,
  removeTaskFromSprint,
  completeSprint,
};
