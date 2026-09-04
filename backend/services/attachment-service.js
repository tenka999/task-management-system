import { prisma } from "../lib/prisma.js";
import fs from "fs";
import path from "path";

async function getTaskAttachments(taskId) {
  return await prisma.taskAttachment.findMany({
    where: { taskId },
    include: {
      uploadedBy: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
        },
      },
    },
    orderBy: { uploadedAt: "desc" },
  });
}

async function getAttachmentById(id) {
  return await prisma.taskAttachment.findUnique({
    where: { id },
    include: {
      task: {
        select: { id: true, title: true, taskNumber: true },
      },
      uploadedBy: {
        select: { id: true, username: true, firstName: true, lastName: true },
      },
    },
  });
}

async function uploadAttachment(taskId, file, userId) {
  return await prisma.taskAttachment.create({
    data: {
      taskId,
      uploadedById: userId,
      fileName: file.filename,
      filePath: file.path,
      fileSize: file.size,
      mimeType: file.mimetype,
    },
    include: {
      uploadedBy: {
        select: { id: true, username: true },
      },
    },
  });
}

async function deleteAttachment(id, userId) {
  const attachment = await prisma.taskAttachment.findUnique({
    where: { id },
  });

  if (!attachment) {
    throw new Error("Attachment not found");
  }

  if (attachment.uploadedById !== userId) {
    throw new Error("Unauthorized to delete this attachment");
  }

  // Delete physical file
  if (fs.existsSync(attachment.filePath)) {
    fs.unlinkSync(attachment.filePath);
  }

  return await prisma.taskAttachment.delete({
    where: { id },
  });
}

export default {
  getTaskAttachments,
  getAttachmentById,
  uploadAttachment,
  deleteAttachment,
};
