// services/api/Label.js

import baseApi from "@/core/api/baseApi";

export const labelApi = {
  // GET /label
  findAll: async (workspaceId) => {
    const response = await baseApi.get("/label", {
      params: { workspaceId },
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch labels");
    return response.data.data;
  },

  // GET /label/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/label/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch label");
    return response.data.data;
  },

  // POST /label
  create: async (payload) => {
    const response = await baseApi.post("/label", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create label");
    return response.data.data;
  },

  // PUT /label/:id
  update: async (id, payload) => {
    const response = await baseApi.put(`/label/${id}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update label");
    return response.data.data;
  },

  // DELETE /label/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/label/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete label");
    return response.data.data;
  },

  // POST /task/:taskId/labels
  addToTask: async (taskId, payload) => {
    const response = await baseApi.post(`/task/${taskId}/labels`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to add label to task");
    return response.data.data;
  },

  // DELETE /task/:taskId/labels/:labelId
  removeFromTask: async (taskId, labelId) => {
    const response = await baseApi.delete(`/task/${taskId}/labels/${labelId}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to remove label from task");
    return response.data.data;
  },
};

export default labelApi;
