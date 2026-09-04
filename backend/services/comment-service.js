import { prisma } from "../lib/prisma.js";

async function getTaskComments(taskId) {
  return await prisma.taskComment.findMany({
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
      replies: {
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
      attachments: true,
      _count: {
        select: { replies: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });
}

async function createComment(taskId, data, userId) {
  const comment = await prisma.taskComment.create({
    data: {
      taskId,
      userId,
      content: data.content,
      parentCommentId: data.parentCommentId,
    },
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

  // Create activity log
  const task = await prisma.task.findUnique({ where: { id: taskId } });

  await prisma.activityLog.create({
    data: {
      workspaceId: task.workspaceId,
      userId,
      taskId,
      projectId: task.projectId,
      actionType: "COMMENTED",
      description: `Comment added: "${data.content.substring(0, 50)}..."`,
    },
  });

  // Notify watchers
  const watchers = await prisma.taskWatcher.findMany({
    where: { taskId, userId: { not: userId } },
  });

  for (const watcher of watchers) {
    await prisma.notification.create({
      data: {
        workspaceId: task.workspaceId,
        userId: watcher.userId,
        taskId,
        projectId: task.projectId,
        type: "COMMENT_ADDED",
        title: "New comment on task",
        message: `${comment.user.username} commented on "${task.title}"`,
        link: `/tasks/${taskId}`,
      },
    });
  }

  return comment;
}

async function updateComment(id, data, userId) {
  const comment = await prisma.taskComment.findUnique({ where: { id } });

  if (comment.userId !== userId) {
    throw new Error("Unauthorized to update this comment");
  }

  return await prisma.taskComment.update({
    where: { id },
    data: {
      content: data.content,
      isEdited: true,
    },
  });
}

async function deleteComment(id, userId) {
  const comment = await prisma.taskComment.findUnique({ where: { id } });

  if (comment.userId !== userId) {
    throw new Error("Unauthorized to delete this comment");
  }

  return await prisma.taskComment.delete({
    where: { id },
  });
}

export default {
  getTaskComments,
  createComment,
  updateComment,
  deleteComment,
};
