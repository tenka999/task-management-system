// services/api/Notification.js

import baseApi from "@/core/api/baseApi";

export const notificationApi = {
  // GET /notification
  findAll: async (params) => {
    const response = await baseApi.get("/notification", {
      params,
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch notifications");
    return response.data.data;
  },

  // GET /notification/unread-count
  getUnreadCount: async () => {
    const response = await baseApi.get("/notification/unread-count", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch unread count");
    return response.data.data;
  },

  // PATCH /notification/:id/read
  markAsRead: async (id) => {
    const response = await baseApi.patch(`/notification/${id}/read`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to mark as read");
    return response.data.data;
  },

  // PATCH /notification/read-all
  markAllAsRead: async () => {
    const response = await baseApi.patch("/notification/read-all", null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to mark all as read");
    return response.data.data;
  },

  // DELETE /notification/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/notification/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to delete notification");
    return response.data.data;
  },

  // DELETE /notification/clear-all
  clearAll: async () => {
    const response = await baseApi.delete("/notification/clear-all", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to clear notifications");
    return response.data.data;
  },
};

export default notificationApi;
