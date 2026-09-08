import { prisma } from "../lib/prisma.js";

async function getUserPreferences(userId) {
  return await prisma.userPreference.findUnique({
    where: { userId },
    include: {
      defaultWorkspace: {},
    },
  });
}

async function setActiveWorkspace(userId, workspaceId) {
  // Check if user is member of workspace
  const member = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId,
      },
    },
  });

  if (!member) {
    throw new Error("User is not a member of this workspace");
  }

  // Check if preference exists
  const existingPref = await prisma.userPreference.findUnique({
    where: { userId },
  });

  if (existingPref) {
    // Update existing preference
    return await prisma.userPreference.update({
      where: { userId },
      data: {
        defaultWorkspaceId: workspaceId,
      },
      include: {
        defaultWorkspace: true,
      },
    });
  } else {
    // Create new preference
    return await prisma.userPreference.create({
      data: {
        userId,
        defaultWorkspaceId: workspaceId,
      },
      include: {
        defaultWorkspace: true,
      },
    });
  }
}

async function getActiveWorkspace(userId) {
  const preference = await prisma.userPreference.findUnique({
    where: { userId },
    include: {
      defaultWorkspace: {
        include: {
          owner: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });
  console.log("preference", preference);

  if (preference?.defaultWorkspace) {
    return preference.defaultWorkspace;
  }

  // If no preference, get first workspace user is member of
  const firstWorkspace = await prisma.workspace.findFirst({
    where: {
      members: {
        some: { userId },
      },
    },

    orderBy: { createdAt: "asc" },
  });

  if (firstWorkspace) {
    // Auto-set as active workspace
    await setActiveWorkspace(userId, firstWorkspace.id);
  }

  return firstWorkspace;
}

export default {
  getUserPreferences,
  setActiveWorkspace,
  getActiveWorkspace,
};
