import { prisma } from "../lib/prisma.ts";

async function getAllUsers() {
  return await prisma.user.findMany({
    include: {
      roleMaps: {
        include: {
          role: true,
        },
      },
    },
  });
}

async function getUserById(id) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}

async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: {
      email: email,
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

async function deleteUser(id) {
  return await prisma.user.delete({
    where: {
      id: id,
    },
  });
}

export default {
  getAllUsers,
  getUserById,
  createRole,
  updateRole,
  deleteUser,
};
