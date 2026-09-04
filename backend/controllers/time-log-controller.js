import timeLogService from "../services/time-log-service.js";
import { responseFormat } from "../utils/helper.js";

const timeLogController = {
  // GET /time-logs/task/:taskId
  async getTaskTimeLogs(req, res) {
    try {
      const timeLogs = await timeLogService.getTaskTimeLogs(req.params.taskId);
      res
        .status(200)
        .json(responseFormat("success", timeLogs, "Time logs fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /time-logs/user
  async getUserTimeLogs(req, res) {
    try {
      const timeLogs = await timeLogService.getUserTimeLogs(
        req.user.id,
        req.query,
      );
      res
        .status(200)
        .json(responseFormat("success", timeLogs, "User time logs fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /time-logs/task/:taskId
  async createTimeLog(req, res) {
    try {
      const timeLog = await timeLogService.createTimeLog(
        req.params.taskId,
        req.body,
        req.user.id,
      );
      res
        .status(201)
        .json(responseFormat("success", timeLog, "Time log created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /time-logs/:id
  async updateTimeLog(req, res) {
    try {
      const timeLog = await timeLogService.updateTimeLog(
        parseInt(req.params.id),
        req.body,
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", timeLog, "Time log updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /time-logs/:id
  async deleteTimeLog(req, res) {
    try {
      const timeLog = await timeLogService.deleteTimeLog(
        parseInt(req.params.id),
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", timeLog, "Time log deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default timeLogController;
