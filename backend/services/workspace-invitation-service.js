import { prisma } from "../lib/prisma.js";
import crypto from "crypto";
import conversationService from "../services/conversation-service.js";

async function getAllInvitations(workspaceId, query = {}) {
  const { status, email, page = 1, limit = 10 } = query;

  const where = { workspaceId };

  if (status) {
    where.status = status;
  }

  if (email) {
    where.email = { contains: email };
  }

  const [invitations, total] = await Promise.all([
    prisma.workspaceInvitation.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: {
        workspace: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
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
      orderBy: { createdAt: "desc" },
    }),
    prisma.workspaceInvitation.count({ where }),
  ]);

  return {
    invitations,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  };
}

async function getInvitationById(id) {
  return await prisma.workspaceInvitation.findUnique({
    where: { id },
    include: {
      workspace: {
        select: {
          id: true,
          name: true,
          logoUrl: true,
          description: true,
          type: true,
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
  });
}

async function getInvitationByToken(token) {
  return await prisma.workspaceInvitation.findUnique({
    where: { token },
    include: {
      workspace: {
        select: {
          id: true,
          name: true,
          logoUrl: true,
          description: true,
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
  });
}

async function getPendingInvitations(workspaceId) {
  return await prisma.workspaceInvitation.findMany({
    where: {
      workspaceId,
      status: "PENDING",
      expiresAt: {
        gt: new Date(),
      },
    },
    include: {
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
    orderBy: { createdAt: "desc" },
  });
}

async function getInvitationsByEmail(email) {
  return await prisma.workspaceInvitation.findMany({
    where: {
      email,
      status: "PENDING",
      expiresAt: {
        gt: new Date(),
      },
    },
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
    orderBy: { createdAt: "desc" },
  });
}
async function getInvitationsByInvitedById(invitedById) {
  return await prisma.workspaceInvitation.findMany({
    where: { invitedById },
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
    orderBy: { createdAt: "desc" },
  });
}

// async function createInvitation(workspaceId, data, invitedById) {
//   // Check if invitation already exists
//   const existingInvitation = await prisma.workspaceInvitation.findFirst({
//     where: {
//       workspaceId,
//       email: data.email,
//       status: "PENDING",
//     },
//   });

//   if (existingInvitation) {
//     throw new Error("Invitation already sent to this email");
//   }

//   // Check if user is already a member
//   const user = await prisma.user.findUnique({
//     where: { email: data.email },
//   });

//   const workspace = await prisma.workspace.findUnique({
//     where: { id: workspaceId },
//   });

//   if (user) {
//     const existingMember = await prisma.workspaceMember.findUnique({
//       where: {
//         workspaceId_userId: {
//           workspaceId,
//           userId: user.id,
//         },
//       },
//     });

//     if (existingMember) {
//       throw new Error("User is already a member of this workspace");
//     }
//   }

//   const result = await prisma.$transaction(async (tx) => {
//     const existing = await tx.conversation.findFirst({
//       where: {
//         type: "DIRECT",
//         AND: [
//           { participants: { some: { userId: invitedById, isActive: true } } },
//           { participants: { some: { userId: user?.id, isActive: true } } },
//         ],
//       },
//       include: {
//         participants: {
//           include: { user: true },
//         },
//       },
//     });

//     if (existing && existing.participants.length === 2) {
//       return existing;
//     }

//     const conversation = await conversationService.createConversation(
//       { type: "DIRECT", participantIds: [invitedById], workspaceId },
//       user?.id,
//     );

//     const notification = await tx.notification.create({
//       data: {
//         workspaceId,
//         type: "WORKSPACE_INVITE",
//         title: "Workspace Invitation",
//         message: `You have been invited to join ${workspace.name}`,
//         userId: user?.id,
//       },
//     });

//     const inbox = await tx.inbox.create({
//       data: {
//         recipientId: user?.id,
//         senderId: invitedById,
//         workspaceId,
//         type: "WORKSPACE_INVITE",
//         priority: "NORMAL",
//         content: `You have been invited to join ${workspace.name}`,
//         conversationId: conversation.id,
//       },
//       include: {
//         sender: {
//           select: {
//             id: true,
//             username: true,
//             firstName: true,
//             lastName: true,
//             avatarUrl: true,
//           },
//         },
//         recipient: {
//           select: {
//             id: true,
//             username: true,
//             firstName: true,
//             lastName: true,
//             avatarUrl: true,
//           },
//         },
//       },
//     });

//     const invitation = await tx.workspaceInvitation.create({
//       data: {
//         workspaceId,
//         email: data.email,
//         role: data.role || "MEMBER",
//         invitedById,
//         token: crypto.randomUUID(),
//         expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//       },
//       include: {
//         workspace: {
//           select: {
//             id: true,
//             name: true,
//             logoUrl: true,
//           },
//         },
//         invitedBy: {
//           select: {
//             id: true,
//             username: true,
//             firstName: true,
//             lastName: true,
//             avatarUrl: true,
//           },
//         },
//       },
//     });

//     return {
//       notification,
//       inbox,
//       conversation,

//       invitation,
//     };
//   });

//   return result;
// }
async function createInvitation(workspaceId, data, invitedById) {
  // ===== VALIDATION (di luar transaction) =====
  console.log(
    "createInvitation data",
    data,
    "workspaceId",
    workspaceId,
    "invitedById",
    invitedById,
  );
  // 1. Check existing pending invitation
  const existingInvitation = await prisma.workspaceInvitation.findFirst({
    where: {
      workspaceId,
      email: data.email,
      status: "PENDING",
    },
  });

  if (existingInvitation) {
    throw new Error("Invitation already sent to this email");
  }

  // 2. Check workspace exists
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
  });

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  // 3. Check if user exists & already a member
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  console.log("user", user);

  if (user) {
    const existingMember = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: user.id,
        },
      },
    });

    if (existingMember) {
      throw new Error("User is already a member of this workspace");
    }
  }

  // ===== TRANSACTION =====
  const result = await prisma.$transaction(async (tx) => {
    let conversation = null;
    let notification = null;
    let inbox = null;

    // Hanya buat conversation & notif jika user TERDAFTAR
    if (user) {
      // Check existing direct conversation (pakai tx, bukan prisma)
      const existingConversation = await tx.conversation.findFirst({
        where: {
          type: "DIRECT",
          AND: [
            { participants: { some: { userId: invitedById, isActive: true } } },
            { participants: { some: { userId: user.id, isActive: true } } },
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
            participantIds: [user.id], // ← User yang di-invite jadi participant
            workspaceId,
          },
          invitedById, // ← Inviter jadi creator
        );
      }

      // ✅ Create notification (pakai tx)
      notification = await tx.notification.create({
        data: {
          workspaceId,
          type: "WORKSPACE_INVITE",
          title: "Workspace Invitation",
          message: `You have been invited to join ${workspace.name}`,
          userId: user.id, // ← Sudah pasti ada user
        },
      });

      // ✅ Create inbox message (pakai tx)

      // ✅ Update conversation last message

      // ✅ Increment unread count
      await tx.conversationParticipant.update({
        where: {
          conversationId_userId: {
            conversationId: conversation.id,
            userId: user.id,
          },
        },
        data: { unreadCount: { increment: 1 } },
      });
    }

    // ✅ Create invitation (selalu dibuat, terlepas dari user terdaftar atau tidak)
    const invitation = await tx.workspaceInvitation.create({
      data: {
        workspaceId,
        email: data.email,
        role: data.role || "MEMBER",
        invitedById,
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      include: {
        workspace: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
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
    });
    console.log("inv", invitation);
    inbox = await tx.inbox.create({
      data: {
        recipientId: user.id,
        senderId: invitedById,
        workspaceId,
        type: "WORKSPACE_INVITE",
        priority: "NORMAL",
        content: `You have been invited to join ${workspace.name}`,
        conversationId: conversation.id,
        workspaceInvitationId: invitation.id,
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
      },
    });

    await tx.conversation.update({
      where: { id: conversation.id },
      data: {
        lastMessageId: inbox.id,
        lastMessageAt: new Date(),
        lastMessagePreview: `You have been invited to join ${workspace.name}`,
        messageCount: { increment: 1 },
      },
    });

    // ✅ Return consistent structure
    return {
      invitation,
      conversation,
      notification,
      inbox,
      isExistingUser: !!user,
    };
  });

  return result;
}

async function resendInvitation(id) {
  const invitation = await prisma.workspaceInvitation.findUnique({
    where: { id },
  });

  if (!invitation) {
    throw new Error("Invitation not found");
  }

  if (invitation.status !== "PENDING") {
    throw new Error("Only pending invitations can be resent");
  }

  return await prisma.workspaceInvitation.update({
    where: { id },
    data: {
      token: crypto.randomUUID(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: "PENDING",
    },
  });
}

async function acceptInvitation(token, userId) {
  const invitation = await prisma.workspaceInvitation.findUnique({
    where: { token },
    include: {
      workspace: true,
    },
  });

  if (!invitation) {
    throw new Error("Invalid invitation token");
  }

  if (invitation.status !== "PENDING") {
    throw new Error("Invitation is no longer valid");
  }

  if (invitation.expiresAt < new Date()) {
    throw new Error("Invitation has expired");
  }

  // Check if user email matches invitation email
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user.email !== invitation.email) {
    throw new Error("This invitation was sent to a different email");
  }

  // Add user as workspace member
  await prisma.workspaceMember.create({
    data: {
      workspaceId: invitation.workspaceId,
      userId,
      role: invitation.role,
      invitedById: invitation.invitedById,
    },
  });

  // Update invitation status
  return await prisma.workspaceInvitation.update({
    where: { id: invitation.id },
    data: {
      status: "ACCEPTED",
      acceptedAt: new Date(),
    },
    include: {
      workspace: true,
    },
  });
}

async function declineInvitation(token) {
  const invitation = await prisma.workspaceInvitation.findUnique({
    where: { token },
  });

  if (!invitation) {
    throw new Error("Invalid invitation token");
  }

  return await prisma.workspaceInvitation.update({
    where: { id: invitation.id },
    data: {
      status: "DECLINED",
    },
  });
}

async function cancelInvitation(id, userId) {
  const invitation = await prisma.workspaceInvitation.findUnique({
    where: { id },
    include: {
      workspace: true,
    },
  });

  if (!invitation) {
    throw new Error("Invitation not found");
  }

  // Check if user is workspace owner or admin
  const member = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId: invitation.workspaceId,
        userId,
      },
    },
  });

  if (!member || !["OWNER", "ADMIN"].includes(member.role)) {
    throw new Error("Unauthorized to cancel this invitation");
  }

  return await prisma.workspaceInvitation.delete({
    where: { id },
  });
}

async function deleteInvitation(id) {
  return await prisma.workspaceInvitation.delete({
    where: { id },
  });
}

export default {
  getAllInvitations,
  getInvitationById,
  getInvitationByToken,
  getPendingInvitations,
  getInvitationsByEmail,
  getInvitationsByInvitedById,
  createInvitation,
  resendInvitation,
  acceptInvitation,
  declineInvitation,
  cancelInvitation,
  deleteInvitation,
};
