import userPreferenceService from "../services/user-preference-service.js";
import { responseFormat } from "../utils/helper.js";

const userPreferenceController = {
  // GET /user-preference
  async getUserPreferences(req, res) {
    try {
      const preferences = await userPreferenceService.getUserPreferences(
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", preferences, "Preferences fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /user-preference/active-workspace
  async getActiveWorkspace(req, res) {
    try {
      const workspace = await userPreferenceService.getActiveWorkspace(
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", workspace, "Active workspace fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /user-preference/active-workspace
  async setActiveWorkspace(req, res) {
    try {
      const workspace = await userPreferenceService.setActiveWorkspace(
        req.user.id,
        req.body.workspaceId,
      );
      res
        .status(200)
        .json(responseFormat("success", workspace, "Active workspace updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default userPreferenceController;
