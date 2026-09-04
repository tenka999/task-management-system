import activityService from "../services/activity-service.js";
import { responseFormat } from "../utils/helper.js";

const activityController = {
  // GET /activity/workspace/:workspaceId
  async getWorkspaceActivity(req, res) {
    try {
      const activities = await activityService.getWorkspaceActivity(
        req.params.workspaceId,
        req.query,
      );
      res
        .status(200)
        .json(responseFormat("success", activities, "Activities fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /activity/task/:taskId
  async getTaskActivity(req, res) {
    try {
      const activities = await activityService.getTaskActivity(
        req.params.taskId,
      );
      res
        .status(200)
        .json(responseFormat("success", activities, "Task activities fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default activityController;
