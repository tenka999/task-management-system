// services/api/Comment.js

import baseApi from "@/core/api/baseApi";

export const commentApi = {
  // GET /task/:taskId/comments
  findByTask: async (taskId) => {
    const response = await baseApi.get(`/task/${taskId}/comments`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch comments");
    return response.data.data;
  },

  // POST /task/:taskId/comments
  create: async (taskId, payload) => {
    const response = await baseApi.post(`/task/${taskId}/comments`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create comment");
    return response.data.data;
  },

  // PUT /comment/:id
  update: async (id, payload) => {
    const response = await baseApi.put(`/comment/${id}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update comment");
    return response.data.data;
  },

  // DELETE /comment/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/comment/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete comment");
    return response.data.data;
  },
};

export default commentApi;
