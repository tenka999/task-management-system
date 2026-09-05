// services/api/Attachment.js

import baseApi from "@/core/api/baseApi";

export const attachmentApi = {
  // GET /attachment/task/:taskId
  findByTask: async (taskId) => {
    const response = await baseApi.get(`/attachment/task/${taskId}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch attachments");
    return response.data.data;
  },

  // POST /attachment/task/:taskId
  upload: async (taskId, formData) => {
    const response = await baseApi.post(
      `/attachment/task/${taskId}`,
      formData,
      {
        headers: {
          "require-auth": true,
          "Content-Type": "multipart/form-data",
        },
      },
    );

    if (response.status !== 201) throw new Error("Failed to upload attachment");
    return response.data.data;
  },

  // DELETE /attachment/:id
  remove: async (id) => {
    const response = await baseApi.delete(`/attachment/${id}`, {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to delete attachment");
    return response.data.data;
  },
};

export default attachmentApi;
