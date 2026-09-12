import baseApi from "@/core/api/baseApi";

export const inboxApi = {
  // GET /inbox
  findAll: async (params) => {
    const response = await baseApi.get("/inbox", {
      params,
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch inbox");
    return response.data.data.inboxes;
  },

  // GET /inbox/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/inbox/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch inbox");
    return response.data.data;
  },

  // GET /inbox/unread-count
  getUnreadCount: async () => {
    const response = await baseApi.get("/inbox/unread-count", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch unread count");
    return response.data.data;
  },

  // GET /inbox/unread-count-by-type
  getUnreadCountByType: async () => {
    const response = await baseApi.get("/inbox/unread-count-by-type", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch unread count");
    return response.data.data;
  },

  // GET /inbox/thread/:threadId
  getThread: async (threadId) => {
    const response = await baseApi.get(`/inbox/thread/${threadId}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch thread");
    return response.data.data;
  },

  // GET /inbox/starred
  getStarred: async () => {
    const response = await baseApi.get("/inbox/starred", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch starred inbox");
    return response.data.data;
  },

  // GET /inbox/archived
  getArchived: async (params) => {
    const response = await baseApi.get("/inbox/archived", {
      params,
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch archived inbox");
    return response.data.data;
  },

  // POST /inbox
  create: async (payload) => {
    const response = await baseApi.post("/inbox", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create inbox");
    return response.data.data;
  },

  // POST /inbox/send-message
  sendMessage: async (payload) => {
    const response = await baseApi.post("/inbox/send-message", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to send message");
    return response.data.data;
  },

  // POST /inbox/:id/reply
  reply: async (id, payload) => {
    const response = await baseApi.post(`/inbox/${id}/reply`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to send reply");
    return response.data.data;
  },

  // PATCH /inbox/:id/read
  markAsRead: async (id) => {
    const response = await baseApi.patch(`/inbox/${id}/read`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to mark as read");
    return response.data.data;
  },

  // PATCH /inbox/read-all
  markAllAsRead: async (payload = {}) => {
    const response = await baseApi.patch("/inbox/read-all", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to mark all as read");
    return response.data.data;
  },

  // PATCH /inbox/:id/star
  toggleStar: async (id) => {
    const response = await baseApi.patch(`/inbox/${id}/star`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to toggle star");
    return response.data.data;
  },

  // PATCH /inbox/:id/archive
  archive: async (id) => {
    const response = await baseApi.patch(`/inbox/${id}/archive`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to archive");
    return response.data.data;
  },

  // PATCH /inbox/:id/unarchive
  unarchive: async (id) => {
    const response = await baseApi.patch(`/inbox/${id}/unarchive`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to unarchive");
    return response.data.data;
  },

  // DELETE /inbox/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/inbox/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete inbox");
    return response.data.data;
  },

  // DELETE /inbox/multiple-delete
  removes: async ({ ids }) => {
    const response = await baseApi.delete("/inbox/multiple-delete", {
      data: { ids },
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete inboxes");
    return response.data.data;
  },

  // DELETE /inbox/:id/permanent
  permanentDelete: async (id) => {
    const response = await baseApi.delete(`/inbox/${id}/permanent`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to permanently delete");
    return response.data.data;
  },
};

export default inboxApi;
