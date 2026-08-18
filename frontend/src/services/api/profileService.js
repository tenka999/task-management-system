// services/api/profilPerusahaan.js
import baseApi from "@/core/api/baseApi";

const profilPerusahaanApi = {
  findAll: async () => {
    const res = await baseApi.get("/profilperusahaan", {
      headers: { "require-auth": true },
    });
    return res.data.data;
  },

  findOne: async (id) => {
    const res = await baseApi.get(`/profilperusahaan/${id}`, {
      headers: { "require-auth": true },
    });
    return res.data.data;
  },

  create: async (payload) => {
    const res = await baseApi.post("/profilperusahaan", payload, {
      headers: { "require-auth": true },
    });
    return res.data.data;
  },

  update: async ({ id, payload }) => {
    const res = await baseApi.put(`/profilperusahaan/${id}`, payload, {
      headers: { "require-auth": true },
    });
    return res.data.data;
  },

  remove: async (id) => {
    const res = await baseApi.delete(`/profilperusahaan/${id}`, {
      headers: { "require-auth": true },
    });
    return res.data.data;
  },
};

export default profilPerusahaanApi;
