import { prisma } from "../lib/prisma.js";

async function getTaskTimeLogs(taskId) {
  return await prisma.taskTimeLog.findMany({
    where: { taskId },
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
    orderBy: { logDate: "desc" },
  });
}

async function getUserTimeLogs(userId, query = {}) {
  const { startDate, endDate, page = 1, limit = 20 } = query;

  const where = { userId };

  if (startDate) {
    where.logDate = { gte: new Date(startDate) };
  }
  if (endDate) {
    where.logDate = { ...where.logDate, lte: new Date(endDate) };
  }

  const [timeLogs, total] = await Promise.all([
    prisma.taskTimeLog.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: {
        task: {
          select: {
            id: true,
            title: true,
            taskNumber: true,
            project: {
              select: { id: true, name: true, projectKey: true },
            },
          },
        },
      },
      orderBy: { logDate: "desc" },
    }),
    prisma.taskTimeLog.count({ where }),
  ]);

  return {
    timeLogs,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  };
}

async function createTimeLog(taskId, data, userId) {
  const timeLog = await prisma.taskTimeLog.create({
    data: {
      taskId,
      userId,
      hoursSpent: data.hoursSpent,
      logDate: new Date(data.logDate),
      description: data.description,
      isBillable: data.isBillable !== undefined ? data.isBillable : true,
    },
    include: {
      user: {
        select: { id: true, username: true, firstName: true, lastName: true },
      },
    },
  });

  // Update task actual hours
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  const totalHours = await prisma.taskTimeLog.aggregate({
    where: { taskId },
    _sum: { hoursSpent: true },
  });

  await prisma.task.update({
    where: { id: taskId },
    data: { actualHours: totalHours._sum.hoursSpent || 0 },
  });

  // Create activity log
  await prisma.activityLog.create({
    data: {
      workspaceId: task.workspaceId,
      userId,
      taskId,
      projectId: task.projectId,
      actionType: "LOGGED_TIME",
      description: `Logged ${data.hoursSpent} hours`,
    },
  });

  return timeLog;
}

async function updateTimeLog(id, data, userId) {
  const timeLog = await prisma.taskTimeLog.findUnique({ where: { id } });

  if (timeLog.userId !== userId) {
    throw new Error("Unauthorized to update this time log");
  }

  return await prisma.taskTimeLog.update({
    where: { id },
    data: {
      hoursSpent: data.hoursSpent,
      logDate: data.logDate ? new Date(data.logDate) : undefined,
      description: data.description,
      isBillable: data.isBillable,
    },
  });
}

async function deleteTimeLog(id, userId) {
  const timeLog = await prisma.taskTimeLog.findUnique({ where: { id } });

  if (timeLog.userId !== userId) {
    throw new Error("Unauthorized to delete this time log");
  }

  return await prisma.taskTimeLog.delete({
    where: { id },
  });
}

export default {
  getTaskTimeLogs,
  getUserTimeLogs,
  createTimeLog,
  updateTimeLog,
  deleteTimeLog,
};
