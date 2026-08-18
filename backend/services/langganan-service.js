import prisma from "../config/database.js";

async function getAll() {
  return await prisma.langganan.findMany({
    include: {
      user: true,
      layanan: true,
    },
  });
}

async function getById(id) {
  return await prisma.langganan.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
      layanan: true,
    },
  });
}

async function perbaruiOtomatis(id, data) {
  function parseBoolean(value) {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
      return value.toLowerCase() === "true";
    }
    return false;
  }
  return await prisma.langganan.update({
    where: {
      id: id,
    },
    data: {
      perbaruiOtomatis: parseBoolean(data.perbaruiOtomatis),
    },
  });
}
async function create(data) {
  const userId = Number(data.userId);
  console.log(userId, data);
  // 1. cek user dulu
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  // 2. update telepon kalau belum ada
  if (!user.telepon && data.telepon) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        telepon: data.telepon,
      },
    });
  }

  // 3. create langganan
  return await prisma.langganan.create({
    data: {
      userId,
      layananId: Number(data.layananId),
      catatan: data.catatan,
      alamatPemasangan: data.alamatPemasangan,
      status: data.status || "PENDING",
    },
    include: {
      user: true,
      layanan: true,
    },
  });
}
async function update(id, data) {
  let tanggalDimulai = null;
  if (data.status === "DITERIMA") tanggalDimulai = new Date();
  return await prisma.langganan.update({
    where: {
      id: id,
    },
    data: {
      alamatPemasangan: data.alamatPemasangan,
      tanggalMulai: tanggalDimulai,
      tanggalAkhir: tanggalDimulai
        ? (() => {
            const d = new Date(tanggalDimulai);
            d.setDate(d.getDate() + 30);
            return d;
          })()
        : null,
      status: data.status,
      layananId: Number(data.layananId),
    },
    include: {
      user: true,
      layanan: true,
    },
  });
}

async function remove(id) {
  return await prisma.langganan.delete({
    where: {
      id: id,
    },
    include: {
      user: true,
      layanan: true,
    },
  });
}

export default {
  getAll,
  getById,
  create,
  update,
  perbaruiOtomatis,
  remove,
};
