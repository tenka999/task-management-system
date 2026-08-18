import prisma from "../config/database.js";

async function getAll() {
  return await prisma.notif.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      userNotif: true,
    },
  });
}

async function getById(id) {
  return await prisma.notif.findUnique({
    where: {
      id: id,
    },
  });
}

async function getGlobalNotif(role, userId) {
  const globalNotif = await prisma.notif.findMany({
    where: {
      forStatus: role,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const userNotif = await prisma.userNotif.findMany({
    where: {
      userId,
    },
  });
  const result = globalNotif.map((notif) => {
    const found = userNotif.find((u) => u.notifId === notif.id);

    return {
      ...notif,
      isDeleted: found?.isDeleted || false,
      status: found?.status || "UNREAD", // default unread
      userNotifId: found?.id || null,
    };
  });

  return result;
}

async function getByStatusId(forStatus, userId) {
  return await prisma.notif.findMany({
    where: {
      OR: [
        {
          forId: null,
          forStatus: forStatus,
        },
        {
          forId: Number(userId),
          forStatus: forStatus,
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function create(data) {
  console.log(data);
  return await prisma.notif.create({
    data: {
      forStatus: data.forStatus,
      judul: data.judul,
      pesan: data.pesan,
      kategori: data.kategori,
    },
  });
}

async function update(id, data) {
  return await prisma.notif.update({
    where: {
      id: id,
    },
    data: {
      judul: data.judul,
      forStatus: data.forStatus,
      pesan: data.pesan,
      kategori: data.kategori,
      status: data.status,
    },
  });
}

async function remove(id) {
  return await prisma.notif.delete({
    where: {
      id: id,
    },
  });
}
async function deleteMany(ids) {
  return await prisma.notif.delete({
    where: {
      id: { in: ids },
    },
  });
}

export default {
  getAll,
  getById,
  getGlobalNotif,
  create,
  update,
  remove,
  deleteMany,
  getByStatusId,
};
