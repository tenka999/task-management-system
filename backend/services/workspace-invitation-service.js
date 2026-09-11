import { prisma } from "../lib/prisma.js";
import crypto from "crypto";

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

async function createInvitation(workspaceId, data, invitedById) {
  // Check if invitation already exists
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

  // Check if user is already a member
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

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

  const result = await prisma.$transaction(async (tx) => {
    const notification = await tx.notification.create({
      data: {
        workspaceId,
        type: "WORKSPACE_INVITE",
        title: "Workspace Invitation",
        message: `You have been invited to join ${data.workspaceName}`,
        userId: user?.id,
      },
    });

    const inbox = await tx.inbox.create({
      data: {
        recipientId: user?.id,
        senderId: invitedById,
        workspaceId,
        type: "WORKSPACE_INVITE",
        priority: "NORMAL",
        subject: "Workspace Invitation",
        content: `You have been invited to join ${data.workspaceName}. Please click the link below to accept the invitation. If you did not request this invitation, you can ignore this email.`,
      },
    });

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

    return {
      notification,
      inbox,
      invitation,
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
  createInvitation,
  resendInvitation,
  acceptInvitation,
  declineInvitation,
  cancelInvitation,
  deleteInvitation,
};
