import { prisma } from "../lib/prisma.ts";

async function getAllRole() {
  return await prisma.userRole.findMany();
}

async function getRoleById(id) {
  return await prisma.userRole.findUnique({
    where: {
      id: id,
    },
  });
}

async function createRole(data) {
  return await prisma.userRole.create({
    data: {
      roleName: data.roleName,
      description: data.description,
    },
  });
}

async function updateRole(id, data) {
  return await prisma.userRole.update({
    where: {
      id: id,
    },
    data: {
      roleName: data.roleName,
      description: data.description,
    },
  });
}

async function deleteRole(id) {
  return await prisma.userRole.delete({
    where: {
      id: parseInt(id),
    },
  });
}

export default {
  getAllRole,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
