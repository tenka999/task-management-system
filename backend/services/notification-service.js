import { prisma } from "../lib/prisma.js";

async function getUserNotifications(userId, query = {}) {
  const { isRead, type, page = 1, limit = 20 } = query;

  const where = { userId };

  if (isRead !== undefined) {
    where.isRead = isRead === "true";
  }

  if (type) {
    where.type = type;
  }

  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: {
        workspace: {
          select: { id: true, name: true, logoUrl: true },
        },
        task: {
          select: { id: true, title: true, taskNumber: true },
        },
        project: {
          select: { id: true, name: true, projectKey: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.notification.count({ where }),
  ]);

  return {
    notifications,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  };
}

async function getUnreadCount(userId) {
  return await prisma.notification.count({
    where: {
      userId,
      isRead: false,
    },
  });
}

async function markAsRead(id, userId) {
  return await prisma.notification.update({
    where: { id },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  });
}

async function markAllAsRead(userId) {
  return await prisma.notification.updateMany({
    where: {
      userId,
      isRead: false,
    },
    data: {
      isRead: true,
      readAt: new Date(),
    },
  });
}

async function deleteNotification(id) {
  return await prisma.notification.delete({
    where: { id },
  });
}

async function clearAllNotifications(userId) {
  return await prisma.notification.deleteMany({
    where: { userId },
  });
}

export default {
  getUserNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
};
