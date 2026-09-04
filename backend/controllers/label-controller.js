import labelService from "../services/label-service.js";
import { responseFormat } from "../utils/helper.js";

const labelController = {
  // GET /labels
  async getAllLabels(req, res) {
    try {
      const labels = await labelService.getAllLabels(req.query.workspaceId);
      res
        .status(200)
        .json(responseFormat("success", labels, "All labels fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /labels/:id
  async getLabelById(req, res) {
    try {
      const label = await labelService.getLabelById(parseInt(req.params.id));
      res.status(200).json(responseFormat("success", label, "Label fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /labels
  async createLabel(req, res) {
    try {
      const label = await labelService.createLabel(
        req.body.workspaceId,
        req.body,
      );
      res.status(201).json(responseFormat("success", label, "Label created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /labels/:id
  async updateLabel(req, res) {
    try {
      const label = await labelService.updateLabel(
        parseInt(req.params.id),
        req.body,
      );
      res.status(200).json(responseFormat("success", label, "Label updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /labels/:id
  async deleteLabel(req, res) {
    try {
      const label = await labelService.deleteLabel(parseInt(req.params.id));
      res.status(200).json(responseFormat("success", label, "Label deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /tasks/:taskId/labels
  async addLabelToTask(req, res) {
    try {
      const result = await labelService.addLabelToTask(
        req.params.taskId,
        req.body.labelId,
      );
      res
        .status(201)
        .json(responseFormat("success", result, "Label added to task"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /tasks/:taskId/labels/:labelId
  async removeLabelFromTask(req, res) {
    try {
      const result = await labelService.removeLabelFromTask(
        req.params.taskId,
        req.params.labelId,
      );
      res
        .status(200)
        .json(responseFormat("success", result, "Label removed from task"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default labelController;
