import baseApi from "@/core/api/baseApi";

export const notifApi = {
  // =========================
  // 🔹 GET NOTIF USER (with query)
  // GET /notif?status=UNREAD
  // =========================

  getNotif: async (params = {}) => {
    const response = await baseApi.get("/notifUser", {
      params,
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch notif");
    return response.data.data;
  },

  // =========================
  // 🔹 GET COUNT
  // GET /notif/count
  // =========================
  getCount: async () => {
    const response = await baseApi.get("/notifUser/count", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch count");
    return response.data.data;
  },

  // =========================
  // 🔹 GET BY ID
  // GET /notif/:id
  // =========================
  findOne: async (id) => {
    const response = await baseApi.get(`/notifUser/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch notif");
    return response.data.data;
  },

  // =========================
  // 🔹 CREATE
  // POST /notif
  // =========================
  create: async (payload) => {
    const response = await baseApi.post("/notifUser", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create notif");
    return response.data.data;
  },

  // =========================
  // 🔥 MARK AS READ (1)
  // PATCH /notif/:id/read
  // =========================
  markAsRead: async (id) => {
    const response = await baseApi.patch(
      `/notifUser/${id}/read`,
      {},
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200) throw new Error("Failed to mark as read");
    return response.data.data;
  },

  // =========================
  // 🔥 MARK AS UNREAD
  // PATCH /notif/:id/unread
  // =========================
  markAsUnread: async (id) => {
    const response = await baseApi.patch(
      `/notifUser/${id}/unread`,
      {},
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200) throw new Error("Failed to mark as unread");
    return response.data.data;
  },

  // =========================
  // 🔥 MARK ALL
  // PATCH /notif/read-all
  // =========================
  markAllAsRead: async () => {
    const response = await baseApi.patch(
      `/notifUser/read-all`,
      {},
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200) throw new Error("Failed to mark all");
    return response.data.data;
  },

  // =========================
  // 🔥 BULK MARK
  // POST /notif/bulk-read
  // =========================
  bulkMarkAsRead: async (ids) => {
    const response = await baseApi.post(
      `/notifUser/bulk-read`,
      { ids },
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200) throw new Error("Failed bulk mark");
    return response.data.data;
  },

  // =========================
  // 🔥 DELETE 1
  // DELETE /notif/:id
  // =========================
  remove: async (id) => {
    const response = await baseApi.delete(`/notifUser/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete notif");
    return response.data.data;
  },

  // =========================
  // 🔥 BULK DELETE
  // POST /notif/bulk-delete
  // =========================
  bulkDelete: async (ids) => {
    const response = await baseApi.post(
      `/notifUser/bulk-delete`,
      { ids },
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200) throw new Error("Failed bulk delete");
    return response.data.data;
  },

  // =========================
  // 🔥 DELETE GLOBAL (ADMIN)
  // DELETE /notif/global/:id
  // =========================
  deleteGlobal: async (id) => {
    const response = await baseApi.delete(`/notifUser/global/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to delete global notif");
    return response.data.data;
  },
  bulkSoftDelete: async (notifIds) => {
    const response = await baseApi.put(
      "/notifUser/bulk-soft-delete",
      { notifIds },
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200) throw new Error("Failed to bulk soft delete");

    return response.data.data;
  },
  softDeleteNotif: async (userId, notifId) => {
    console.log("notifId", notifId, userId);
    const response = await baseApi.delete(
      `/notifUser/${userId.notifId}/${userId.userId}`,
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200)
      throw new Error("Failed to delete global notif");
    return response.data.data;
  },
};

export default notifApi;
