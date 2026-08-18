import prisma from "../config/database.js";

async function getAll() {
  return await prisma.customerServiceTicket.findMany({
    include: {
      userTiket: true,
      adminTiket: true,
      langganan: true,
      messages: {
        include: {
          sender: true,
        },
      },
      langganan: {
        include: {
          layanan: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getById(id) {
  return await prisma.customerServiceTicket.findUnique({
    where: { id },
    include: {
      user: true,
      langganan: true,
      messages: {
        include: {
          sender: true,
        },
      },
    },
  });
}

async function create(data) {
  return await prisma.customerServiceTicket.create({
    data: {
      userId: parseInt(data.userId),
      langgananId: parseInt(data.langgananId),
      judul: data.judul,
    },
  });
}

async function update(id, data) {
  return await prisma.customerServiceTicket.update({
    where: { id },
    data: {
      status: data.status,
      closedAt: data.status === "SELESAI" ? new Date() : null,
    },
  });
}

async function updateAssign(id, data) {
  console.log("data", data);
  return await prisma.customerServiceTicket.update({
    where: { id },
    data: {
      adminTiketId: parseInt(data.adminId),
      status: "DIPROSES",
    },
  });
}

async function close(id) {
  return await prisma.customerServiceTicket.update({
    where: { id },
    data: {
      status: "SELESAI",
      closedAt: new Date(),
    },
  });
}

async function updateTicket(id, data) {
  return await prisma.customerServiceTicket.update({
    where: { id },
    data: {
      langgananId: parseInt(data.langgananId),
      judul: data.judul,
      status: data.status,
      closedAt: data.status === "SELESAI" ? new Date() : null,
    },
  });
}

async function remove(id) {
  return await prisma.customerServiceTicket.delete({
    where: { id },
  });
}

export default {
  getAll,
  getById,
  create,
  update,
  close,
  updateTicket,
  updateAssign,
  remove,
};
