// services/api/Task.js

import baseApi from "@/core/api/baseApi";

export const taskApi = {
  // GET /task
  findAll: async (params) => {
    const response = await baseApi.get("/task", {
      params,
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch tasks");
    return response.data.data;
  },

  // GET /task/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/task/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch task");
    return response.data.data;
  },

  // POST /task
  create: async (payload) => {
    const response = await baseApi.post("/task", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create task");
    return response.data.data;
  },

  // PUT /task/:id
  update: async (id, payload) => {
    const response = await baseApi.put(`/task/${id}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update task");
    return response.data.data;
  },

  // DELETE /task/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/task/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete task");
    return response.data.data;
  },

  // PATCH /task/:id/status
  updateStatus: async (id, statusId) => {
    const response = await baseApi.patch(
      `/task/${id}/status`,
      { statusId },
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200)
      throw new Error("Failed to update task status");
    return response.data.data;
  },
};

export default taskApi;
