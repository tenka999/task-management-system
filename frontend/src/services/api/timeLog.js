// services/api/TimeLog.js

import baseApi from "@/core/api/baseApi";

export const timeLogApi = {
  // GET /time-log/task/:taskId
  findByTask: async (taskId) => {
    const response = await baseApi.get(`/time-log/task/${taskId}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch time logs");
    return response.data.data;
  },

  // GET /time-log/user
  findByUser: async (params) => {
    const response = await baseApi.get("/time-log/user", {
      params,
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch user time logs");
    return response.data.data;
  },

  // POST /time-log/task/:taskId
  create: async (taskId, payload) => {
    const response = await baseApi.post(`/time-log/task/${taskId}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create time log");
    return response.data.data;
  },

  // PUT /time-log/:id
  update: async (id, payload) => {
    const response = await baseApi.put(`/time-log/${id}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update time log");
    return response.data.data;
  },

  // DELETE /time-log/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/time-log/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete time log");
    return response.data.data;
  },
};

export default timeLogApi;
