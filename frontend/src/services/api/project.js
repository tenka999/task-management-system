// services/api/Project.js

import baseApi from "@/core/api/baseApi";

export const projectApi = {
  // GET /project
  findAll: async (params) => {
    const response = await baseApi.get("/project", {
      params,
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch projects");
    return response.data.data;
  },

  // GET /project/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/project/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch project");
    return response.data.data;
  },

  // POST /project
  create: async (payload) => {
    const response = await baseApi.post("/project", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create project");
    return response.data.data;
  },

  // PUT /project/:id
  update: async (id, payload) => {
    const response = await baseApi.put(`/project/${id}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update project");
    return response.data.data;
  },

  // DELETE /project/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/project/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete project");
    return response.data.data;
  },

  // GET /project/:id/members
  getMembers: async (id) => {
    const response = await baseApi.get(`/project/${id}/members`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch members");
    return response.data.data;
  },

  // POST /project/:id/members
  addMember: async (id, payload) => {
    const response = await baseApi.post(`/project/${id}/members`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to add member");
    return response.data.data;
  },

  // DELETE /project/:id/members/:userId
  removeMember: async (id, userId) => {
    const response = await baseApi.delete(`/project/${id}/members/${userId}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to remove member");
    return response.data.data;
  },

  // GET /project/:id/statuses
  getStatuses: async (id) => {
    const response = await baseApi.get(`/project/${id}/statuses`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch statuses");
    return response.data.data;
  },

  // POST /project/:id/statuses
  createStatus: async (id, payload) => {
    const response = await baseApi.post(`/project/${id}/statuses`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create status");
    return response.data.data;
  },
};

export default projectApi;
