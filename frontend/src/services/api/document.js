// services/api/Document.js

import baseApi from "@/core/api/baseApi";

export const documentApi = {
  // GET /document
  findAll: async (params) => {
    const response = await baseApi.get("/document", {
      params,
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch documents");
    return response.data.data;
  },

  // GET /document/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/document/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch document");
    return response.data.data;
  },

  // POST /document
  create: async (payload) => {
    const response = await baseApi.post("/document", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create document");
    return response.data.data;
  },

  // PUT /document/:id
  update: async (id, payload) => {
    const response = await baseApi.put(`/document/${id}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update document");
    return response.data.data;
  },

  // DELETE /document/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/document/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete document");
    return response.data.data;
  },

  // PATCH /document/:id/archive
  archive: async (id) => {
    const response = await baseApi.patch(`/document/${id}/archive`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to archive document");
    return response.data.data;
  },

  // PATCH /document/:id/restore
  restore: async (id) => {
    const response = await baseApi.patch(`/document/${id}/restore`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to restore document");
    return response.data.data;
  },
};

export default documentApi;
