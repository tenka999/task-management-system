import dependencyService from "../services/depedency-service.js";
import { responseFormat } from "../utils/helper.js";

const dependencyController = {
  // GET /dependencies/task/:taskId
  async getTaskDependencies(req, res) {
    try {
      const dependencies = await dependencyService.getTaskDependencies(
        req.params.taskId,
      );
      res
        .status(200)
        .json(responseFormat("success", dependencies, "Dependencies fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /dependencies/task/:taskId
  async addDependency(req, res) {
    try {
      const dependency = await dependencyService.addDependency(
        req.params.taskId,
        req.body.dependencyId,
        req.body.relationType,
        req.user.id,
      );
      res
        .status(201)
        .json(responseFormat("success", dependency, "Dependency added"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /dependencies/task/:taskId/:dependencyId
  async removeDependency(req, res) {
    try {
      const dependency = await dependencyService.removeDependency(
        req.params.taskId,
        req.params.dependencyId,
      );
      res
        .status(200)
        .json(responseFormat("success", dependency, "Dependency removed"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default dependencyController;
