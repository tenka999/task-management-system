// services/api/ActivityLog.js

import baseApi from "@/core/api/baseApi";

export const activityLogApi = {
  // GET /activity/workspace/:workspaceId
  findByWorkspace: async (workspaceId, params) => {
    const response = await baseApi.get(`/activity/workspace/${workspaceId}`, {
      params,
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch activities");
    return response.data.data;
  },

  // GET /activity/task/:taskId
  findByTask: async (taskId) => {
    const response = await baseApi.get(`/activity/task/${taskId}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch task activities");
    return response.data.data;
  },
};

export default activityLogApi;
