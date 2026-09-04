import { prisma } from "../lib/prisma.js";

async function getAllDocuments(workspaceId, query = {}) {
  const {
    projectId,
    isArchived,
    parentDocumentId,
    search,
    page = 1,
    limit = 20,
  } = query;

  const where = { workspaceId };

  if (projectId) where.projectId = projectId;
  if (isArchived !== undefined) where.isArchived = isArchived === "true";
  if (parentDocumentId === "null") where.parentDocumentId = null;
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { content: { contains: search } },
    ];
  }

  const [documents, total] = await Promise.all([
    prisma.document.findMany({
      where,
      skip: (page - 1) * limit,
      take: parseInt(limit),
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatarUrl: true,
          },
        },
        updatedBy: {
          select: { id: true, username: true, firstName: true, lastName: true },
        },
        parentDocument: {
          select: { id: true, title: true },
        },
        subDocuments: {
          select: { id: true, title: true },
        },
        project: {
          select: { id: true, name: true, projectKey: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.document.count({ where }),
  ]);

  return {
    documents,
    total,
    page: parseInt(page),
    totalPages: Math.ceil(total / limit),
  };
}

async function getDocumentById(id) {
  return await prisma.document.findUnique({
    where: { id },
    include: {
      workspace: {
        select: { id: true, name: true },
      },
      project: {
        select: { id: true, name: true, projectKey: true },
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
      updatedBy: {
        select: { id: true, username: true, firstName: true, lastName: true },
      },
      parentDocument: {
        select: { id: true, title: true },
      },
      subDocuments: {
        include: {
          createdBy: {
            select: { id: true, username: true },
          },
        },
      },
    },
  });
}

async function createDocument(workspaceId, data, userId) {
  return await prisma.document.create({
    data: {
      workspaceId,
      projectId: data.projectId,
      parentDocumentId: data.parentDocumentId,
      title: data.title,
      content: data.content,
      createdById: userId,
    },
    include: {
      createdBy: {
        select: { id: true, username: true },
      },
    },
  });
}

async function updateDocument(id, data, userId) {
  return await prisma.document.update({
    where: { id },
    data: {
      title: data.title,
      content: data.content,
      projectId: data.projectId,
      parentDocumentId: data.parentDocumentId,
      isArchived: data.isArchived,
      updatedById: userId,
    },
  });
}

async function deleteDocument(id) {
  return await prisma.document.delete({
    where: { id },
  });
}

async function archiveDocument(id) {
  return await prisma.document.update({
    where: { id },
    data: {
      isArchived: true,
    },
  });
}

async function restoreDocument(id) {
  return await prisma.document.update({
    where: { id },
    data: {
      isArchived: false,
    },
  });
}

export default {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  archiveDocument,
  restoreDocument,
};
