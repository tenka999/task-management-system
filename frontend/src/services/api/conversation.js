import baseApi from "@/core/api/baseApi";

export const conversationApi = {
  // GET /conversation
  findAll: async (params) => {
    const response = await baseApi.get("/conversation", {
      params,
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch conversations");
    return response.data.data;
  },

  // GET /conversation/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/conversation/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch conversation");
    return response.data.data;
  },

  // GET /conversation/:id/messages
  getMessages: async (id, params) => {
    const response = await baseApi.get(`/conversation/${id}/messages`, {
      params,
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch messages");
    return response.data.data;
  },

  // GET /conversation/unread-count
  getUnreadCount: async () => {
    const response = await baseApi.get("/conversation/unread-count", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch unread count");
    return response.data.data;
  },

  // POST /conversation
  create: async (payload) => {
    const response = await baseApi.post("/conversation", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201)
      throw new Error("Failed to create conversation");
    return response.data.data;
  },

  // POST /conversation/direct/:userId
  getOrCreateDirect: async (userId, payload = {}) => {
    const response = await baseApi.post(
      `/conversation/direct/${userId}`,
      payload,
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200) throw new Error("Failed to open conversation");
    return response.data.data;
  },

  // PUT /conversation/:id
  update: async (id, payload) => {
    const response = await baseApi.put(`/conversation/${id}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to update conversation");
    return response.data.data;
  },

  // POST /conversation/:id/participants
  addParticipant: async (id, payload) => {
    const response = await baseApi.post(
      `/conversation/${id}/participants`,
      payload,
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 201) throw new Error("Failed to add participant");
    return response.data.data;
  },

  // DELETE /conversation/:id/participants/:userId
  removeParticipant: async (id, userId) => {
    const response = await baseApi.delete(
      `/conversation/${id}/participants/${userId}`,
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200)
      throw new Error("Failed to remove participant");
    return response.data.data;
  },

  // PATCH /conversation/:id/read
  markAsRead: async (id) => {
    const response = await baseApi.patch(`/conversation/${id}/read`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to mark as read");
    return response.data.data;
  },

  // PATCH /conversation/:id/pin
  togglePin: async (id) => {
    const response = await baseApi.patch(`/conversation/${id}/pin`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to toggle pin");
    return response.data.data;
  },

  // PATCH /conversation/:id/mute
  toggleMute: async (id) => {
    const response = await baseApi.patch(`/conversation/${id}/mute`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to toggle mute");
    return response.data.data;
  },

  // PATCH /conversation/:id/archive
  archive: async (id) => {
    const response = await baseApi.patch(`/conversation/${id}/archive`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to archive");
    return response.data.data;
  },

  // PATCH /conversation/:id/close
  close: async (id) => {
    const response = await baseApi.patch(`/conversation/${id}/close`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to close");
    return response.data.data;
  },

  // DELETE /conversation/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/conversation/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to delete conversation");
    return response.data.data;
  },
};

export default conversationApi;
