// services/api/User.js

import baseApi from "@/core/api/baseApi";

export const userApi = {
  // GET /user
  findAll: async (params) => {
    const response = await baseApi.get("/user", {
      params,
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch users");
    return response.data.data;
  },

  // GET /user/:id
  findOne: async (id) => {
    const response = await baseApi.get(`/user/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch user");
    return response.data.data;
  },

  // POST /user
  create: async (payload) => {
    const response = await baseApi.post("/user", payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 201) throw new Error("Failed to create user");
    return response.data.data;
  },

  // PUT /user/:id
  update: async (id, payload) => {
    const response = await baseApi.put(`/user/${id}`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update user");
    return response.data.data;
  },

  // PUT /user/:id/password
  updatePassword: async (id, payload) => {
    const response = await baseApi.put(`/user/${id}/password`, payload, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to update password");
    return response.data.data;
  },

  // DELETE /user/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/user/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete user");
    return response.data.data;
  },
};

export default userApi;
