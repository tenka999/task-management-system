import { prisma } from "../lib/prisma.js";

async function getWorkspaceActivity(workspaceId, query = {}) {
  const { userId, taskId, projectId, actionType, page = 1, limit = 30 } = query;

  const where = { workspaceId };

  if (userId) where.userId = userId;
  if (taskId) where.taskId = taskId;
  if (projectId) where.projectId = projectId;
  if (actionType) where.actionType = actionType;

  const [activities, total] = await Promise.all([
    prisma.activityLog.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
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
        project: {
          select: { id: true, name: true, projectKey: true },
        },
        task: {
          select: { id: true, title: true, taskNumber: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.activityLog.count({ where }),
  ]);

  return {
    activities,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  };
}

async function getTaskActivity(taskId) {
  return await prisma.activityLog.findMany({
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
    orderBy: { createdAt: "desc" },
  });
}

export default {
  getWorkspaceActivity,
  getTaskActivity,
};
