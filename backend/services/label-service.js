import { prisma } from "../lib/prisma.js";

async function getAllLabels(workspaceId) {
  return await prisma.label.findMany({
    where: { workspaceId },
    include: {
      _count: {
        select: { tasks: true },
      },
    },
  });
}

async function getLabelById(id) {
  return await prisma.label.findUnique({
    where: { id },
    include: {
      tasks: {
        include: {
          task: {
            select: { id: true, title: true, taskNumber: true, status: true },
          },
        },
      },
    },
  });
}

async function createLabel(workspaceId, data) {
  return await prisma.label.create({
    data: {
      workspaceId,
      name: data.name,
      color: data.color,
      description: data.description,
    },
  });
}

async function updateLabel(id, data) {
  return await prisma.label.update({
    where: { id },
    data: {
      name: data.name,
      color: data.color,
      description: data.description,
    },
  });
}

async function deleteLabel(id) {
  return await prisma.label.delete({
    where: { id },
  });
}

async function addLabelToTask(taskId, labelId) {
  return await prisma.taskLabel.create({
    data: {
      taskId,
      labelId: parseInt(labelId),
    },
  });
}

async function removeLabelFromTask(taskId, labelId) {
  return await prisma.taskLabel.delete({
    where: {
      taskId_labelId: {
        taskId,
        labelId: parseInt(labelId),
      },
    },
  });
}

export default {
  getAllLabels,
  getLabelById,
  createLabel,
  updateLabel,
  deleteLabel,
  addLabelToTask,
  removeLabelFromTask,
};
