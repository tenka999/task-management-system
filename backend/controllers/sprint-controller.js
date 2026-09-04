import sprintService from "../services/sprint-service.js";
import { responseFormat } from "../utils/helper.js";

const sprintController = {
  // GET /sprints
  async getAllSprints(req, res) {
    try {
      const sprints = await sprintService.getAllSprints(req.query.projectId);
      res
        .status(200)
        .json(responseFormat("success", sprints, "All sprints fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /sprints/:id
  async getSprintById(req, res) {
    try {
      const sprint = await sprintService.getSprintById(parseInt(req.params.id));
      res.status(200).json(responseFormat("success", sprint, "Sprint fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /sprints
  async createSprint(req, res) {
    try {
      const sprint = await sprintService.createSprint(
        req.body.projectId,
        req.body,
        req.user.id,
      );
      res.status(201).json(responseFormat("success", sprint, "Sprint created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /sprints/:id
  async updateSprint(req, res) {
    try {
      const sprint = await sprintService.updateSprint(
        parseInt(req.params.id),
        req.body,
      );
      res.status(200).json(responseFormat("success", sprint, "Sprint updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /sprints/:id
  async deleteSprint(req, res) {
    try {
      const sprint = await sprintService.deleteSprint(parseInt(req.params.id));
      res.status(200).json(responseFormat("success", sprint, "Sprint deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /sprints/:id/tasks
  async addTaskToSprint(req, res) {
    try {
      const result = await sprintService.addTaskToSprint(
        req.params.id,
        req.body.taskId,
      );
      res
        .status(200)
        .json(responseFormat("success", result, "Task added to sprint"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /sprints/:id/tasks/:taskId
  async removeTaskFromSprint(req, res) {
    try {
      const result = await sprintService.removeTaskFromSprint(
        req.params.taskId,
      );
      res
        .status(200)
        .json(responseFormat("success", result, "Task removed from sprint"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /sprints/:id/complete
  async completeSprint(req, res) {
    try {
      const sprint = await sprintService.completeSprint(
        parseInt(req.params.id),
      );
      res
        .status(200)
        .json(responseFormat("success", sprint, "Sprint completed"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default sprintController;
