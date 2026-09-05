// services/api/Sprint.js

import baseApi from "@/core/api/baseApi";

export const sprintApi = {
  // GET /sprint
  findAll: async (projectId) => {
    const response = await baseApi.get("/sprint", {
      params: { projectId },
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch sprints");
    return response.data.data;
  },

  // GET /sprint/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/sprint/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch sprint");
    return response.data.data;
  },

  // POST /sprint
  create: async (payload) => {
    const response = await baseApi.post("/sprint", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create sprint");
    return response.data.data;
  },

  // PUT /sprint/:id
  update: async (id, payload) => {
    const response = await baseApi.put(`/sprint/${id}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update sprint");
    return response.data.data;
  },

  // DELETE /sprint/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/sprint/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete sprint");
    return response.data.data;
  },

  // POST /sprint/:id/tasks
  addTask: async (id, payload) => {
    const response = await baseApi.post(`/sprint/${id}/tasks`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to add task to sprint");
    return response.data.data;
  },

  // DELETE /sprint/:id/tasks/:taskId
  removeTask: async (id, taskId) => {
    const response = await baseApi.delete(`/sprint/${id}/tasks/${taskId}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to remove task from sprint");
    return response.data.data;
  },

  // PATCH /sprint/:id/complete
  complete: async (id) => {
    const response = await baseApi.patch(`/sprint/${id}/complete`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to complete sprint");
    return response.data.data;
  },
};

export default sprintApi;
