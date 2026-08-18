import prisma from "../config/database.js";

async function getAll() {
  return await prisma.faq.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getActive() {
  return await prisma.faq.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      urutan: "asc",
    },
    take: 7,
  });
}

async function getById(id) {
  return await prisma.faq.findUnique({
    where: {
      id: id,
    },
  });
}

async function create(data) {
  return await prisma.faq.create({
    data: {
      pertanyaan: data.pertanyaan,
      jawaban: data.jawaban,
      kategori: data.kategori,
      isActive: data.isActive === true ? true : false,
      urutan: data.urutan,
    },
  });
}

async function update(id, data) {
  return await prisma.faq.update({
    where: {
      id: id,
    },
    data: {
      pertanyaan: data.pertanyaan,
      jawaban: data.jawaban,
      kategori: data.kategori,
      urutan: data.urutan,
      isActive: data.isActive === true ? true : false,
    },
  });
}
async function updateOrder(id, data) {
  return await prisma.faq.update({
    where: {
      id: id,
    },
    data: {
      urutan: data.urutan,
    },
  });
}
async function updateActive(id, data) {
  console.log(data);
  return await prisma.faq.update({
    where: {
      id: id,
    },
    data: {
      isActive: data.isActive,
    },
  });
}
async function updateViews(id) {
  return await prisma.faq.update({
    where: { id: Number(id) },
    data: {
      views: {
        increment: 1,
      },
    },
  });
}

async function remove(id) {
  return await prisma.faq.delete({
    where: {
      id: id,
    },
  });
}

export default {
  getAll,
  getActive,
  getById,
  create,
  update,
  updateOrder,
  updateActive,
  updateViews,
  remove,
};
