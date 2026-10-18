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
        project: true,
        workspace: true,
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
      project: true,
      workspace: true,
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
      // sprintId: data.sprintId,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      estimatedTime: data.estimatedTime,
      taskNumber: (lastTask?.taskNumber || 0) + 1,
      labels: {
        createMany: {
          data: data.labels,
        },
      },
    },
    include: {
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
      estimatedTime: data.estimatedTime,
      actualTime: data.actualTime,
      progressPercent: data.progressPercent,
    },
    include: {
      assignee: true,
      labels: { include: { label: true } },
    },
  });

  // Create activity log
  // if (oldTask.statusId !== data.statusId) {
  //   await prisma.activityLog.create({
  //     data: {
  //       workspaceId: oldTask.workspaceId,
  //       userId,
  //       taskId: id,
  //       projectId: oldTask.projectId,
  //       actionType: "STATUS_CHANGED",
  //       oldValue: String(oldTask.statusId),
  //       newValue: String(data.statusId),
  //       description: `Status changed to ${updatedTask.status.name}`,
  //     },
  //   });
  // }

  return updatedTask;
}

async function updateTaskPriority(id, data) {
  return await prisma.task.update({
    where: { id },
    data: { priority: data.priority },
  });
}

async function updateTaskStatus(id, data) {
  return await prisma.task.update({
    where: { id },
    data: { status: data.status },
  });
}

async function deleteTask(id) {
  return await prisma.task.delete({
    where: { id },
  });
}

export default {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskPriority,
  deleteTask,
  updateTaskStatus,
};
