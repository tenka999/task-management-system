// services/api/Dependency.js

import baseApi from "@/core/api/baseApi";

export const dependencyApi = {
  // GET /dependency/task/:taskId
  findByTask: async (taskId) => {
    const response = await baseApi.get(`/dependency/task/${taskId}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch dependencies");
    return response.data.data;
  },

  // POST /dependency/task/:taskId
  create: async (taskId, payload) => {
    const response = await baseApi.post(`/dependency/task/${taskId}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to add dependency");
    return response.data.data;
  },

  // DELETE /dependency/task/:taskId/:dependencyId
  remove: async (taskId, dependencyId) => {
    const response = await baseApi.delete(
      `/dependency/task/${taskId}/${dependencyId}`,
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200) throw new Error("Failed to remove dependency");
    return response.data.data;
  },
};

export default dependencyApi;
