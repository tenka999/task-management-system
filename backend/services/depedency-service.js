import { prisma } from "../lib/prisma.js";

async function getTaskDependencies(taskId) {
  return await prisma.taskDependency.findMany({
    where: { taskId },
    include: {
      dependency: {
        select: {
          id: true,
          title: true,
          taskNumber: true,
          status: true,
          priority: true,
        },
      },
    },
  });
}

async function addDependency(taskId, dependencyId, relationType, userId) {
  return await prisma.taskDependency.create({
    data: {
      taskId,
      dependencyId,
      relationType: relationType || "BLOCKS",
      createdById: userId,
    },
    include: {
      dependency: {
        select: { id: true, title: true, taskNumber: true },
      },
    },
  });
}

async function removeDependency(taskId, dependencyId) {
  return await prisma.taskDependency.delete({
    where: {
      taskId_dependencyId: {
        taskId,
        dependencyId,
      },
    },
  });
}

export default {
  getTaskDependencies,
  addDependency,
  removeDependency,
};
