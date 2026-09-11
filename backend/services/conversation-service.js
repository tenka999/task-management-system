import { prisma } from "../lib/prisma.js";

async function getUserConversations(userId, query = {}) {
  const { status, type, isPinned, search, page = 1, limit = 20 } = query;

  const where = {
    participants: {
      some: {
        userId,
        isActive: true,
      },
    },
  };

  if (status) where.status = status;
  if (type) where.type = type;
  if (isPinned !== undefined) where.isPinned = isPinned === "true";
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
      { lastMessagePreview: { contains: search } },
    ];
  }

  const [conversations, total] = await Promise.all([
    prisma.conversation.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: {
        participants: {
          where: { isActive: true },
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
        lastMessage: {
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
        },
        task: {
          select: { id: true, title: true, taskNumber: true },
        },
        project: {
          select: { id: true, name: true, projectKey: true },
        },
        _count: {
          select: {
            messages: true,
            participants: true,
          },
        },
      },
      orderBy: [
        { isPinned: "desc" },
        { lastMessageAt: "desc" },
        { createdAt: "desc" },
      ],
    }),
    prisma.conversation.count({ where }),
  ]);

  // Get unread count for each conversation
  const conversationsWithUnread = await Promise.all(
    conversations.map(async (conv) => {
      const participant = await prisma.conversationParticipant.findUnique({
        where: {
          conversationId_userId: {
            conversationId: conv.id,
            userId,
          },
        },
      });

      return {
        ...conv,
        unreadCount: participant?.unreadCount || 0,
        isMuted: participant?.isMuted || false,
        isPinned: participant?.isPinned || false,
        lastReadAt: participant?.lastReadAt,
      };
    }),
  );

  return {
    conversations: conversationsWithUnread,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  };
}

async function getConversationById(id, userId) {
  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      workspace: {
        select: { id: true, name: true, logoUrl: true },
      },
      project: {
        select: { id: true, name: true, projectKey: true },
      },
      task: {
        select: { id: true, title: true, taskNumber: true },
      },
      createdBy: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
      participants: {
        where: { isActive: true },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              avatarUrl: true,
              isActive: true,
            },
          },
          invitedBy: {
            select: { id: true, username: true },
          },
        },
      },
      lastMessage: {
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
      },
      _count: {
        select: {
          messages: true,
          participants: true,
        },
      },
    },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  // Check if user is participant
  const participant = await prisma.conversationParticipant.findUnique({
    where: {
      conversationId_userId: {
        conversationId: id,
        userId,
      },
    },
  });

  if (!participant || !participant.isActive) {
    throw new Error("Unauthorized to view this conversation");
  }

  return {
    ...conversation,
    currentUserParticipant: participant,
  };
}

async function getConversationMessages(conversationId, userId, query = {}) {
  const { page = 1, limit = 50, before, after } = query;

  // Check if user is participant
  const participant = await prisma.conversationParticipant.findUnique({
    where: {
      conversationId_userId: {
        conversationId,
        userId,
      },
    },
  });

  if (!participant || !participant.isActive) {
    throw new Error("Unauthorized to view this conversation");
  }

  const where = { conversationId };

  if (before) {
    where.createdAt = { lt: new Date(before) };
  }
  if (after) {
    where.createdAt = { ...where.createdAt, gt: new Date(after) };
  }

  const [messages, total] = await Promise.all([
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
        attachments: true,
        parent: {
          select: {
            id: true,
            content: true,
            sender: {
              select: { id: true, username: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.inbox.count({ where }),
  ]);

  return {
    messages: messages.reverse(),
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  };
}

async function getConversationUnreadCount(userId) {
  const result = await prisma.conversationParticipant.aggregate({
    where: {
      userId,
      isActive: true,
      isMuted: false,
    },
    _sum: {
      unreadCount: true,
    },
  });

  return result._sum.unreadCount || 0;
}

async function createConversation(data, userId) {
  // Determine type-specific validation
  if (
    data.type === "DIRECT" &&
    (!data.participantIds || data.participantIds.length !== 1)
  ) {
    throw new Error("Direct conversation requires exactly 1 other participant");
  }

  if (
    data.type === "GROUP" &&
    (!data.participantIds || data.participantIds.length < 2)
  ) {
    throw new Error("Group conversation requires at least 2 participants");
  }

  // For DIRECT conversations, check if conversation already exists
  if (data.type === "DIRECT") {
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        type: "DIRECT",
        participants: {
          every: {
            userId: { in: [userId, data.participantIds[0]] },
          },
        },
      },
      include: {
        participants: true,
      },
    });

    if (
      existingConversation &&
      existingConversation.participants.length === 2
    ) {
      return existingConversation;
    }
  }

  // Create conversation with creator as participant
  const allParticipantIds = [userId, ...(data.participantIds || [])];

  const conversation = await prisma.conversation.create({
    data: {
      workspaceId: data.workspaceId,
      projectId: data.projectId,
      taskId: data.taskId,
      type: data.type || "DIRECT",
      title: data.title,
      description: data.description,
      avatarUrl: data.avatarUrl,
      createdById: userId,
      participants: {
        create: allParticipantIds.map((pId) => ({
          userId: pId,
          role: pId === userId ? "OWNER" : "MEMBER",
          invitedById: pId === userId ? null : userId,
        })),
      },
    },
    include: {
      participants: {
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
    },
  });

  return conversation;
}

async function updateConversation(id, data, userId) {
  // Check if user is admin/owner
  const participant = await prisma.conversationParticipant.findUnique({
    where: {
      conversationId_userId: {
        conversationId: id,
        userId,
      },
    },
  });

  if (!participant || !["OWNER", "ADMIN"].includes(participant.role)) {
    throw new Error("Unauthorized to update this conversation");
  }

  return await prisma.conversation.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      avatarUrl: data.avatarUrl,
      status: data.status,
    },
  });
}

async function addParticipant(conversationId, data, userId) {
  // Check if user is admin/owner
  const currentParticipant = await prisma.conversationParticipant.findUnique({
    where: {
      conversationId_userId: {
        conversationId,
        userId,
      },
    },
  });

  if (
    !currentParticipant ||
    !["OWNER", "ADMIN"].includes(currentParticipant.role)
  ) {
    throw new Error("Unauthorized to add participants");
  }

  // Check if user already participant
  const existing = await prisma.conversationParticipant.findUnique({
    where: {
      conversationId_userId: {
        conversationId,
        userId: data.userId,
      },
    },
  });

  if (existing) {
    if (existing.isActive) {
      throw new Error("User is already a participant");
    }

    // Reactivate participant
    return await prisma.conversationParticipant.update({
      where: { id: existing.id },
      data: {
        isActive: true,
        leftAt: null,
        joinedAt: new Date(),
      },
    });
  }

  return await prisma.conversationParticipant.create({
    data: {
      conversationId,
      userId: data.userId,
      role: data.role || "MEMBER",
      invitedById: userId,
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
}

async function removeParticipant(conversationId, participantUserId, userId) {
  // User can remove themselves, or admin/owner can remove others
  const currentParticipant = await prisma.conversationParticipant.findUnique({
    where: {
      conversationId_userId: {
        conversationId,
        userId,
      },
    },
  });

  const canRemove =
    participantUserId === userId ||
    (currentParticipant &&
      ["OWNER", "ADMIN"].includes(currentParticipant.role));

  if (!canRemove) {
    throw new Error("Unauthorized to remove participant");
  }

  return await prisma.conversationParticipant.update({
    where: {
      conversationId_userId: {
        conversationId,
        userId: participantUserId,
      },
    },
    data: {
      isActive: false,
      leftAt: new Date(),
    },
  });
}

async function markAsRead(conversationId, userId) {
  return await prisma.conversationParticipant.update({
    where: {
      conversationId_userId: {
        conversationId,
        userId,
      },
    },
    data: {
      lastReadAt: new Date(),
      unreadCount: 0,
    },
  });
}

async function togglePin(conversationId, userId) {
  const participant = await prisma.conversationParticipant.findUnique({
    where: {
      conversationId_userId: {
        conversationId,
        userId,
      },
    },
  });

  return await prisma.conversationParticipant.update({
    where: {
      conversationId_userId: {
        conversationId,
        userId,
      },
    },
    data: {
      isPinned: !participant.isPinned,
    },
  });
}

async function toggleMute(conversationId, userId) {
  const participant = await prisma.conversationParticipant.findUnique({
    where: {
      conversationId_userId: {
        conversationId,
        userId,
      },
    },
  });

  return await prisma.conversationParticipant.update({
    where: {
      conversationId_userId: {
        conversationId,
        userId,
      },
    },
    data: {
      isMuted: !participant.isMuted,
    },
  });
}

async function archiveConversation(id, userId) {
  const participant = await prisma.conversationParticipant.findUnique({
    where: {
      conversationId_userId: {
        conversationId: id,
        userId,
      },
    },
  });

  if (!participant || !["OWNER", "ADMIN"].includes(participant.role)) {
    throw new Error("Unauthorized to archive this conversation");
  }

  return await prisma.conversation.update({
    where: { id },
    data: {
      status: "ARCHIVED",
      archivedAt: new Date(),
    },
  });
}

async function closeConversation(id, userId) {
  const participant = await prisma.conversationParticipant.findUnique({
    where: {
      conversationId_userId: {
        conversationId: id,
        userId,
      },
    },
  });

  if (!participant || !["OWNER", "ADMIN"].includes(participant.role)) {
    throw new Error("Unauthorized to close this conversation");
  }

  return await prisma.conversation.update({
    where: { id },
    data: {
      status: "CLOSED",
      closedAt: new Date(),
    },
  });
}

async function deleteConversation(id, userId) {
  const conversation = await prisma.conversation.findUnique({
    where: { id },
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  // Only creator can delete
  if (conversation.createdById !== userId) {
    throw new Error("Only creator can delete this conversation");
  }

  return await prisma.conversation.delete({
    where: { id },
  });
}

async function getOrCreateDirectConversation(
  userId,
  otherUserId,
  workspaceId = null,
) {
  if (userId === otherUserId) {
    throw new Error("Cannot create conversation with yourself");
  }

  // Check if exists
  const existing = await prisma.conversation.findFirst({
    where: {
      type: "DIRECT",
      AND: [
        { participants: { some: { userId, isActive: true } } },
        { participants: { some: { userId: otherUserId, isActive: true } } },
      ],
    },
    include: {
      participants: {
        where: { isActive: true },
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
    },
  });

  if (existing && existing.participants.length === 2) {
    return existing;
  }

  // Create new
  return await createConversation(
    {
      type: "DIRECT",
      participantIds: [otherUserId],
      workspaceId,
    },
    userId,
  );
}

export default {
  getUserConversations,
  getConversationById,
  getConversationMessages,
  getConversationUnreadCount,
  createConversation,
  updateConversation,
  addParticipant,
  removeParticipant,
  markAsRead,
  togglePin,
  toggleMute,
  archiveConversation,
  closeConversation,
  deleteConversation,
  getOrCreateDirectConversation,
};
