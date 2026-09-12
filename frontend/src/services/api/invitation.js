import baseApi from "@/core/api/baseApi";

export const invitationApi = {
  // GET /invitation?workspaceId=xxx
  findAll: async (params) => {
    console.log("params", params);
    const response = await baseApi.get("/invitation", {
      params,
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch invitations");
    return response.data.data;
  },

  // GET /invitation/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/invitation/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch invitation");
    return response.data.data;
  },

  // GET /invitation/token/:token
  findByToken: async (token) => {
    const response = await baseApi.get(`/invitation/token/${token}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch invitation");
    return response.data.data;
  },

  // GET /invitation/pending/:workspaceId
  findPending: async (workspaceId) => {
    const response = await baseApi.get(`/invitation/pending/${workspaceId}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch pending invitations");
    return response.data.data;
  },

  // GET /invitation/email/:email
  findByEmail: async (email) => {
    const response = await baseApi.get(`/invitation/email/${email}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch invitations");
    return response.data.data;
  },
  findByInvitedById: async (invitedById) => {
    const response = await baseApi.get(
      `/invitation/invitedById/${invitedById}`,
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200) throw new Error("Failed to fetch invitations");
    return response.data.data;
  },

  // POST /invitation
  create: async (payload) => {
    const response = await baseApi.post("/invitation", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create invitation");
    return response.data.data;
  },

  // POST /invitation/:id/resend
  resend: async (id) => {
    const response = await baseApi.post(`/invitation/${id}/resend`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to resend invitation");
    return response.data.data;
  },

  // POST /invitation/accept/:token
  accept: async (token) => {
    const response = await baseApi.post(`/invitation/accept/${token}`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to accept invitation");
    return response.data.data;
  },

  // POST /invitation/decline/:token
  decline: async (token) => {
    const response = await baseApi.post(`/invitation/decline/${token}`, null, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to decline invitation");
    return response.data.data;
  },

  // DELETE /invitation/:id
  cancel: async (id) => {
    const response = await baseApi.delete(`/invitation/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to cancel invitation");
    return response.data.data;
  },

  // DELETE /invitation/:id/delete
  remove: async (id) => {
    const response = await baseApi.delete(`/invitation/${id}/delete`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete invitation");
    return response.data.data;
  },
};

export default invitationApi;
