import { prisma } from "../lib/prisma.js";
import conversationService from "../services/conversation-service.js";

async function getUserInbox(userId, query = {}) {
  const { status, type, isStarred, search, page = 1, limit = 20 } = query;

  const where = { recipientId: userId };

  if (status) where.status = status;
  if (type) where.type = type;
  if (isStarred !== undefined) where.isStarred = isStarred === "true";
  if (search) {
    where.OR = [
      { subject: { contains: search } },
      { content: { contains: search } },
    ];
  }

  const [inboxes, total] = await Promise.all([
    prisma.inbox.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
        workspace: {
          select: { id: true, name: true, logoUrl: true },
        },
        workspaceInvitation: {
          include: {
            workspace: {
              select: {
                id: true,
                name: true,
                logoUrl: true,
                description: true,
                _count: {
                  select: {
                    members: true,
                  },
                },
              },
            },
            invitedBy: {
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
        project: {
          select: { id: true, name: true, projectKey: true },
        },
        task: {
          select: { id: true, title: true, taskNumber: true },
        },
        attachments: true,
        _count: {
          select: { replies: true },
        },
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.inbox.count({ where }),
  ]);

  return {
    inboxes,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  };
}

async function getInboxById(id, userId) {
  const inbox = await prisma.inbox.findUnique({
    where: { id },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
      recipient: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
      workspace: {
        select: { id: true, name: true, logoUrl: true },
      },
      project: {
        select: { id: true, name: true, projectKey: true },
      },
      task: {
        select: { id: true, title: true, taskNumber: true },
      },
      comment: true,
      parent: {
        include: {
          sender: {
            select: { id: true, username: true, avatarUrl: true },
          },
        },
      },
      replies: {
        include: {
          sender: {
            select: { id: true, username: true, avatarUrl: true },
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
    },
  });

  if (!inbox) {
    throw new Error("Inbox not found");
  }

  // Check permission
  if (inbox.recipientId !== userId && inbox.senderId !== userId) {
    throw new Error("Unauthorized to view this inbox");
  }

  // Auto-mark as read if recipient
  if (inbox.recipientId === userId && inbox.status === "UNREAD") {
    await prisma.inbox.update({
      where: { id },
      data: {
        status: "READ",
        readAt: new Date(),
      },
    });
  }

  return inbox;
}

async function getUnreadCount(userId) {
  return await prisma.inbox.count({
    where: {
      recipientId: userId,
      status: "UNREAD",
    },
  });
}

async function getUnreadCountByType(userId) {
  const counts = await prisma.inbox.groupBy({
    by: ["type"],
    where: {
      recipientId: userId,
      status: "UNREAD",
    },
    _count: {
      type: true,
    },
  });

  const result = {
    DIRECT_MESSAGE: 0,
    TASK_MENTION: 0,
    TASK_ASSIGNMENT: 0,
    COMMENT_REPLY: 0,
    PROJECT_INVITE: 0,
    WORKSPACE_INVITE: 0,
    SYSTEM: 0,
  };

  counts.forEach((item) => {
    result[item.type] = item._count.type;
  });

  return result;
}

async function getThread(threadId, userId) {
  return await prisma.inbox.findMany({
    where: {
      threadId,
      OR: [{ recipientId: userId }, { senderId: userId }],
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
      attachments: true,
    },
    orderBy: { createdAt: "asc" },
  });
}

async function getStarredInbox(userId) {
  return await prisma.inbox.findMany({
    where: {
      recipientId: userId,
      isStarred: true,
      status: { not: "DELETED" },
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
      workspace: {
        select: { id: true, name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function getArchivedInbox(userId, query = {}) {
  const { page = 1, limit = 20 } = query;

  const where = {
    recipientId: userId,
    status: "ARCHIVED",
  };

  const [inboxes, total] = await Promise.all([
    prisma.inbox.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: { archivedAt: "desc" },
    }),
    prisma.inbox.count({ where }),
  ]);

  return {
    inboxes,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  };
}

async function createInbox(data) {
  return await prisma.inbox.create({
    data: {
      recipientId: data.recipientId,
      senderId: data.senderId,
      workspaceId: data.workspaceId,
      projectId: data.projectId,
      taskId: data.taskId,
      commentId: data.commentId,
      type: data.type || "DIRECT_MESSAGE",
      priority: data.priority || "NORMAL",
      subject: data.subject,
      content: data.content,
      metadata: data.metadata,
      threadId: data.threadId,
      parentId: data.parentId,
      attachments: data.attachments
        ? {
            create: data.attachments.map((att) => ({
              uploadedById: data.senderId,
              fileName: att.fileName,
              filePath: att.filePath,
              fileSize: att.fileSize,
              mimeType: att.mimeType,
            })),
          }
        : undefined,
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
      attachments: true,
    },
  });
}

async function sendDirectMessage(senderId, data) {
  // Check if recipient exists
  const recipient = await prisma.user.findUnique({
    where: { id: data.recipientId },
  });

  if (!recipient) {
    throw new Error("Recipient not found");
  }

  if (senderId === data.recipientId) {
    throw new Error("Cannot send message to yourself");
  }

  // Generate thread ID if this is a new conversation
  // const threadId =
  //   data.threadId || `thread_${Date.now()}_${senderId}_${data.recipientId}`;

  let conversation = null;

  // Hanya buat conversation & notif jika user TERDAFTAR
  if (recipient) {
    // Check existing direct conversation (pakai tx, bukan prisma)
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        type: "DIRECT",
        AND: [
          { participants: { some: { userId: senderId, isActive: true } } },
          { participants: { some: { userId: recipient.id, isActive: true } } },
        ],
      },
      include: {
        participants: { include: { user: true } },
      },
    });

    if (
      existingConversation &&
      existingConversation.participants.length === 2
    ) {
      conversation = existingConversation;
    } else {
      // ✅ FIX: participantIds = [user.id], creator = invitedById
      conversation = await conversationService.createConversation(
        {
          type: "DIRECT",
          participantIds: [recipient.id], // ← User yang di-invite jadi participant
          workspaceId: data.workspaceId,
        },
        senderId, // ← Inviter jadi creator
      );
    }

    // ✅ Create notification (pakai tx)
    notification = await prisma.notification.create({
      data: {
        workspaceId: data.workspaceId,
        type: "NEW_MESSAGE",
        title: "New Message Received",
        message: `${data.content}`,
        userId: user.id, // ← Sudah pasti ada user
      },
    });

    // ✅ Create inbox message (pakai tx)

    // ✅ Update conversation last message

    // ✅ Increment unread count
    await prisma.conversationParticipant.update({
      where: {
        conversationId_userId: {
          conversationId: conversation.id,
          userId: recipient.id,
        },
      },
      data: { unreadCount: { increment: 1 } },
    });
  }

  return await prisma.inbox.create({
    data: {
      recipientId: data.recipientId,
      senderId,
      type: "DIRECT_MESSAGE",
      subject: data.subject,
      content: data.content,
      threadId,
      priority: data.priority || "NORMAL",
      attachments: data.attachments
        ? {
            create: data.attachments.map((att) => ({
              uploadedById: senderId,
              fileName: att.fileName,
              filePath: att.filePath,
              fileSize: att.fileSize,
              mimeType: att.mimeType,
            })),
          }
        : undefined,
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
      recipient: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
      attachments: true,
    },
  });
}

async function replyToInbox(inboxId, senderId, data) {
  const parentInbox = await prisma.inbox.findUnique({
    where: { id: inboxId },
  });

  if (!parentInbox) {
    throw new Error("Parent inbox not found");
  }

  // Determine recipient (if replying, recipient becomes the original sender)
  const recipientId =
    parentInbox.senderId === senderId
      ? parentInbox.recipientId
      : parentInbox.senderId;

  return await prisma.inbox.create({
    data: {
      recipientId,
      senderId,
      type: parentInbox.type,
      subject: `Re: ${parentInbox.subject || ""}`,
      content: data.content,
      threadId: parentInbox.threadId,
      parentId: inboxId,
      priority: parentInbox.priority,
      attachments: data.attachments
        ? {
            create: data.attachments.map((att) => ({
              uploadedById: senderId,
              fileName: att.fileName,
              filePath: att.filePath,
              fileSize: att.fileSize,
              mimeType: att.mimeType,
            })),
          }
        : undefined,
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
      attachments: true,
    },
  });
}

async function markAsRead(id, userId) {
  const inbox = await prisma.inbox.findUnique({ where: { id } });

  if (!inbox || inbox.recipientId !== userId) {
    throw new Error("Unauthorized");
  }

  return await prisma.inbox.update({
    where: { id },
    data: {
      status: "READ",
      readAt: new Date(),
    },
  });
}

async function markAllAsRead(userId, type = null) {
  const where = {
    recipientId: userId,
    status: "UNREAD",
  };

  if (type) where.type = type;

  return await prisma.inbox.updateMany({
    where,
    data: {
      status: "READ",
      readAt: new Date(),
    },
  });
}

async function toggleStar(id, userId) {
  const inbox = await prisma.inbox.findUnique({ where: { id } });

  if (!inbox || inbox.recipientId !== userId) {
    throw new Error("Unauthorized");
  }

  return await prisma.inbox.update({
    where: { id },
    data: {
      isStarred: !inbox.isStarred,
    },
  });
}

async function archiveInbox(id, userId) {
  const inbox = await prisma.inbox.findUnique({ where: { id } });

  if (!inbox || inbox.recipientId !== userId) {
    throw new Error("Unauthorized");
  }

  return await prisma.inbox.update({
    where: { id },
    data: {
      status: "ARCHIVED",
      archivedAt: new Date(),
    },
  });
}

async function unarchiveInbox(id, userId) {
  const inbox = await prisma.inbox.findUnique({ where: { id } });

  if (!inbox || inbox.recipientId !== userId) {
    throw new Error("Unauthorized");
  }

  return await prisma.inbox.update({
    where: { id },
    data: {
      status: "READ",
      archivedAt: null,
    },
  });
}

async function deleteInbox(id, userId) {
  const inbox = await prisma.inbox.findUnique({ where: { id } });

  if (!inbox || inbox.recipientId !== userId) {
    throw new Error("Unauthorized");
  }

  return await prisma.inbox.update({
    where: { id },
    data: {
      status: "DELETED",
      deletedAt: new Date(),
    },
  });
}

async function deleteMultipleInbox(ids, userId) {
  return await prisma.inbox.updateMany({
    where: {
      id: { in: ids },
      recipientId: userId,
    },
    data: {
      status: "DELETED",
      deletedAt: new Date(),
    },
  });
}

async function permanentDelete(id, userId) {
  const inbox = await prisma.inbox.findUnique({ where: { id } });

  if (!inbox || inbox.recipientId !== userId) {
    throw new Error("Unauthorized");
  }

  return await prisma.inbox.delete({
    where: { id },
  });
}

export default {
  getUserInbox,
  getInboxById,
  getUnreadCount,
  getUnreadCountByType,
  getThread,
  getStarredInbox,
  getArchivedInbox,
  createInbox,
  sendDirectMessage,
  replyToInbox,
  markAsRead,
  markAllAsRead,
  toggleStar,
  archiveInbox,
  unarchiveInbox,
  deleteInbox,
  deleteMultipleInbox,
  permanentDelete,
};
