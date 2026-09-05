// services/api/Workspace.js

import baseApi from "@/core/api/baseApi";

export const workspaceApi = {
  // GET /workspace
  findAll: async (params) => {
    const response = await baseApi.get("/workspaces", {
      params,
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch workspaces");
    return response.data.data;
  },

  // GET /workspace/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/workspace/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch workspace");
    return response.data.data;
  },
  findBySlug: async (slug) => {
    const response = await baseApi.get(`/workspace/check-slug/${slug}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch workspace");
    return response.data.data;
  },

  // POST /workspace
  create: async (payload) => {
    const response = await baseApi.post("/workspace", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create workspace");
    return response.data.data;
  },

  // PUT /workspace/:id
  update: async (id, payload) => {
    const response = await baseApi.put(`/workspace/${id}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update workspace");
    return response.data.data;
  },

  // DELETE /workspace/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/workspace/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete workspace");
    return response.data.data;
  },

  // GET /workspace/:id/members
  getMembers: async (id) => {
    const response = await baseApi.get(`/workspace/${id}/members`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch members");
    return response.data.data;
  },

  // POST /workspace/:id/members
  addMember: async (id, payload) => {
    const response = await baseApi.post(`/workspace/${id}/members`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to add member");
    return response.data.data;
  },

  // PUT /workspace/:id/members/:userId
  updateMember: async (id, userId, payload) => {
    const response = await baseApi.put(
      `/workspace/${id}/members/${userId}`,
      payload,
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200) throw new Error("Failed to update member");
    return response.data.data;
  },

  // DELETE /workspace/:id/members/:userId
  removeMember: async (id, userId) => {
    const response = await baseApi.delete(
      `/workspace/${id}/members/${userId}`,
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200) throw new Error("Failed to remove member");
    return response.data.data;
  },

  // POST /workspace/:id/invite
  inviteMember: async (id, payload) => {
    const response = await baseApi.post(`/workspace/${id}/invite`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to invite member");
    return response.data.data;
  },
};

export default workspaceApi;
