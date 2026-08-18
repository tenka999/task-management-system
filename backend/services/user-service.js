import prisma from "../config/database.js";
import bcrypt from "bcrypt";

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getSubscriptionState(sub) {
  if (!sub.tanggalMulai || !sub.tanggalAkhir) {
    return "BELUM_AKTIF";
  }

  if (sub.status !== "DITERIMA") {
    return "BELUM_AKTIF";
  }

  const now = new Date();
  const end = new Date(sub.tanggalAkhir);

  const diffMs = end - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "EXPIRED";
  if (diffDays <= 1) return "AKAN_EXPIRED";

  return "AKTIF";
}

async function handleAutoRenew(sub) {
  const state = getSubscriptionState(sub);

  if (
    state === "EXPIRED" &&
    sub.perbaruiOtomatis &&
    sub.status === "DITERIMA"
  ) {
    const now = new Date();
    const newEnd = addDays(now, 30);

    return await prisma.langganan.update({
      where: { id: sub.id },
      data: {
        tanggalMulai: now,
        tanggalAkhir: newEnd,
      },
    });
  }

  return sub;
}

async function getAllUsers() {
  return await prisma.user.findMany();
}

async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      ulasan: true,
      userNotif: true,
      userTiket: {
        include: {
          langganan: {
            include: {
              layanan: true,
            },
          },
          messages: {
            include: {
              sender: true,
            },
          },
        },
      },
      csMessages: true,
      langganan: {
        include: {
          layanan: {
            include: {
              benefit: true,
            },
          },
        },
      },
    },
  });

  if (!user) return null;

  const processedLangganan = [];

  for (const sub of user.langganan) {
    const updatedSub = await handleAutoRenew(sub);
    const state = getSubscriptionState(updatedSub);

    processedLangganan.push({
      ...updatedSub,
      state,
    });
  }

  return {
    ...user,
    langganan: processedLangganan,
  };
}

async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

async function createUser(data) {
  const hashedPass = await bcrypt.hash(data.password, 10);

  return await prisma.user.create({
    data: {
      nama: data.nama,
      email: data.email,
      telepon: data.telepon,
      password: hashedPass,
      role: data.role || "USER",
    },
  });
}

async function updateUser(id, data) {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      nama: data.nama,
      email: data.email,
      telepon: data.telepon,
      role: data.role,
    },
  });
}

async function deleteUser(id) {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}

export default {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
