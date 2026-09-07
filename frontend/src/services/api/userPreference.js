import baseApi from "@/core/api/baseApi";

export const userPreferenceApi = {
  // GET /user-preference
  findOne: async () => {
    const response = await baseApi.get("/user-preference", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200) throw new Error("Failed to fetch preferences");
    return response.data.data;
  },

  // GET /user-preference/active-workspace
  findActiveWorkspace: async () => {
    const response = await baseApi.get("/user-preference/active-workspace", {
      headers: { "require-auth": true },
    });

    if (response.status !== 200)
      throw new Error("Failed to fetch active workspace");
    return response.data.data;
  },

  // PUT /user-preference/active-workspace
  setActiveWorkspace: async (payload) => {
    const response = await baseApi.put(
      "/user-preference/active-workspace",
      payload,
      {
        headers: { "require-auth": true },
      },
    );

    if (response.status !== 200)
      throw new Error("Failed to set active workspace");
    return response.data.data;
  },
};

export default userPreferenceApi;
