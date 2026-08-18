import prisma from "../config/database.js";

async function getAll() {
  return await prisma.userNotif.findMany({
    orderBy: {
      notif: {
        createdAt: "desc",
      },
    },
    include: {
      user: true,
    },
  });
}

async function getById(id) {
  return await prisma.userNotif.findUnique({
    where: {
      id: id,
    },
  });
}

async function deleteNotif(userId, notifId) {
  return await prisma.userNotif.delete({
    where: {
      userId_notifId: {
        userId: Number(userId),
        notifId: Number(notifId),
      },
    },
  });
}

async function bulkDeleteNotif(userId, notifIds) {
  return await prisma.userNotif.deleteMany({
    where: {
      userId: Number(userId),
      notifId: {
        in: notifIds.map(Number),
      },
    },
  });
}

// async function markAsRead(userId, notifId) {
//   return await prisma.userNotif.update({
//     where: {
//       userId_notifId: {
//         userId: Number(userId),
//         notifId: Number(notifId),
//       },
//     },
//     data: {
//       status: "READ",
//     },
//   });
// }

async function markAsRead(userId, notifId) {
  return await prisma.userNotif.upsert({
    where: {
      userId_notifId: {
        userId: Number(userId),
        notifId: Number(notifId),
      },
    },
    update: {
      status: "READ",
    },
    create: {
      userId: Number(userId),
      notifId: Number(notifId),
      status: "READ",
    },
  });
}

async function markAsUnread(userId, notifId) {
  return await prisma.userNotif.update({
    where: {
      userId_notifId: {
        userId: Number(userId),
        notifId: Number(notifId),
      },
    },
    data: {
      status: "UNREAD",
    },
  });
}

// async function markAllAsRead(userId) {
//   return await prisma.userNotif.updateMany({
//     where: {
//       userId: Number(userId),
//       status: "UNREAD",
//     },
//     data: {
//       status: "READ",
//     },
//   });
// }

async function markAllAsRead(userId, role) {
  console.log("role", role);
  const notifs = await prisma.notif.findMany({
    where: {
      forStatus: role,
    },
    select: { id: true },
  });

  const data = notifs.map((n) => ({
    userId: Number(userId),
    notifId: n.id,
    status: "READ",
  }));

  await prisma.userNotif.createMany({
    data,
    skipDuplicates: true, // 🔥 penting
  });

  // update semua jadi READ
  await prisma.userNotif.updateMany({
    where: {
      userId: Number(userId),
    },
    data: {
      status: "READ",
    },
  });
}

async function getNotifUser(userId, status) {
  console.log("status", status, userId);
  return await prisma.userNotif.findMany({
    where: {
      userId: Number(userId),
      ...(status && { status }),
    },
    include: {
      notif: true,
    },
    orderBy: [
      {
        notif: {
          createdAt: "desc",
        },
      },
    ],
  });
}

async function getNotifCount(userId) {
  const total = await prisma.userNotif.count({
    where: { userId: Number(userId) },
  });

  const unread = await prisma.userNotif.count({
    where: {
      userId: Number(userId),
      status: "UNREAD",
    },
  });

  return {
    total,
    unread,
    read: total - unread,
  };
}

async function deleteMultipleNotif(userId, notifIds) {
  return await prisma.userNotif.deleteMany({
    where: {
      userId: Number(userId),
      notifId: {
        in: notifIds.map(Number),
      },
    },
  });
}

async function deleteGlobalNotif(notifId) {
  return await prisma.$transaction(async (tx) => {
    await tx.userNotif.deleteMany({
      where: {
        notifId: Number(notifId),
      },
    });

    await tx.notif.delete({
      where: {
        id: Number(notifId),
      },
    });
  });
}
async function softDeleteNotif(userId, notifId) {
  return await prisma.userNotif.updateMany({
    where: {
      userId: Number(userId),
      notifId: Number(notifId),
    },
    data: {
      isDeleted: true,
    },
  });
}

async function bulkSoftDelete(userId, notifIds) {
  return await prisma.userNotif.updateMany({
    where: {
      userId: Number(userId),
      notifId: {
        in: notifIds.map(Number),
      },
    },
    data: {
      isDeleted: true,
    },
  });
}

export default {
  getAll,
  getById,
  deleteNotif,
  bulkDeleteNotif,
  markAsRead,
  markAsUnread,
  markAllAsRead,
  getNotifUser,
  getNotifCount,
  deleteGlobalNotif,
  deleteMultipleNotif,
  softDeleteNotif,
  bulkSoftDelete,
};
