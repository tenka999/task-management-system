import { prisma } from "../lib/prisma.js";

async function getAllTasks(query = {}) {
  const {
    projectId,
    workspaceId,
    assigneeId,
    reporterId,
    statusId,
    priorityId,
    sprintId,
    parentTaskId,
    search,
    page = 1,
    limit = 20,
  } = query;

  const where = {};

  if (projectId) where.projectId = projectId;
  if (workspaceId) where.workspaceId = workspaceId;
  if (assigneeId) where.assigneeId = assigneeId;
  if (reporterId) where.reporterId = reporterId;
  if (statusId) where.statusId = parseInt(statusId);
  if (priorityId) where.priorityId = parseInt(priorityId);
  if (sprintId) where.sprintId = parseInt(sprintId);
  if (parentTaskId === "null") where.parentTaskId = null;
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: {
        assignee: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
        reporter: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
        status: true,
        priority: true,
        sprint: true,
        labels: {
          include: { label: true },
        },
        _count: {
          select: {
            comments: true,
            attachments: true,
            subTasks: true,
            watchers: true,
            timeLogs: true,
          },
        },
      },
      orderBy: [{ taskNumber: "desc" }],
    }),
    prisma.task.count({ where }),
  ]);

  return {
    tasks,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  };
}

async function getTaskById(id) {
  return await prisma.task.findUnique({
    where: { id },
    include: {
      project: {
        select: { id: true, name: true, projectKey: true, color: true },
      },
      workspace: {
        select: { id: true, name: true },
      },
      parentTask: {
        select: { id: true, title: true, taskNumber: true },
      },
      subTasks: {
        include: {
          status: true,
          assignee: {
            select: { id: true, username: true, avatarUrl: true },
          },
        },
      },
      assignee: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
      reporter: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
      sprint: true,
      status: true,
      priority: true,
      labels: {
        include: { label: true },
      },
      watchers: {
        include: {
          user: {
            select: { id: true, username: true, avatarUrl: true },
          },
        },
      },
      comments: {
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
          _count: {
            select: { replies: true, attachments: true },
          },
        },
        orderBy: { createdAt: "asc" },
      },
      attachments: {
        include: {
          uploadedBy: {
            select: { id: true, username: true },
          },
        },
      },
      timeLogs: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { logDate: "desc" },
      },
      dependencies: {
        include: {
          dependency: {
            select: { id: true, title: true, taskNumber: true, status: true },
          },
        },
      },
    },
  });
}

async function createTask(data, userId) {
  // Get next task number
  const lastTask = await prisma.task.findFirst({
    where: { projectId: data.projectId },
    orderBy: { taskNumber: "desc" },
  });

  return await prisma.task.create({
    data: {
      projectId: data.projectId,
      workspaceId: data.workspaceId,
      title: data.title,
      description: data.description,
      parentTaskId: data.parentTaskId,
      assigneeId: data.assigneeId,
      reporterId: userId,
      sprintId: data.sprintId,
      statusId: data.statusId,
      priorityId: data.priorityId,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      estimatedHours: data.estimatedHours,
      taskNumber: (lastTask?.taskNumber || 0) + 1,
      labels: data.labelIds
        ? {
            create: data.labelIds.map((labelId) => ({
              labelId: parseInt(labelId),
            })),
          }
        : undefined,
      watchers: data.watcherIds
        ? {
            create: data.watcherIds.map((watcherId) => ({ userId: watcherId })),
          }
        : undefined,
    },
    include: {
      status: true,
      priority: true,
      assignee: true,
      labels: { include: { label: true } },
    },
  });
}

async function updateTask(id, data, userId) {
  // Log activity
  const oldTask = await prisma.task.findUnique({ where: { id } });

  const updatedTask = await prisma.task.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      parentTaskId: data.parentTaskId,
      assigneeId: data.assigneeId,
      sprintId: data.sprintId,
      statusId: data.statusId,
      priorityId: data.priorityId,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      estimatedHours: data.estimatedHours,
      progressPercent: data.progressPercent,
    },
    include: {
      status: true,
      priority: true,
      assignee: true,
    },
  });

  // Create activity log
  if (oldTask.statusId !== data.statusId) {
    await prisma.activityLog.create({
      data: {
        workspaceId: oldTask.workspaceId,
        userId,
        taskId: id,
        projectId: oldTask.projectId,
        actionType: "STATUS_CHANGED",
        oldValue: String(oldTask.statusId),
        newValue: String(data.statusId),
        description: `Status changed to ${updatedTask.status.name}`,
      },
    });
  }

  return updatedTask;
}

async function deleteTask(id) {
  return await prisma.task.delete({
    where: { id },
  });
}

async function updateTaskStatus(id, statusId, userId) {
  const oldTask = await prisma.task.findUnique({ where: { id } });

  const updatedTask = await prisma.task.update({
    where: { id },
    data: {
      statusId: parseInt(statusId),
      progressPercent: statusId ? 100 : oldTask.progressPercent,
    },
  });

  // Log activity
  await prisma.activityLog.create({
    data: {
      workspaceId: oldTask.workspaceId,
      userId,
      taskId: id,
      projectId: oldTask.projectId,
      actionType: "STATUS_CHANGED",
      oldValue: String(oldTask.statusId),
      newValue: String(statusId),
    },
  });

  return updatedTask;
}

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
