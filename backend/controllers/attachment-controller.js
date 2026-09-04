import attachmentService from "../services/attachment-service.js";
import { responseFormat } from "../utils/helper.js";

const attachmentController = {
  // GET /attachments/task/:taskId
  async getTaskAttachments(req, res) {
    try {
      const attachments = await attachmentService.getTaskAttachments(
        req.params.taskId,
      );
      res
        .status(200)
        .json(responseFormat("success", attachments, "Attachments fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /attachments/:id
  async getAttachmentById(req, res) {
    try {
      const attachment = await attachmentService.getAttachmentById(
        parseInt(req.params.id),
      );
      res
        .status(200)
        .json(responseFormat("success", attachment, "Attachment fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /attachments/task/:taskId
  async uploadAttachment(req, res) {
    try {
      const attachment = await attachmentService.uploadAttachment(
        req.params.taskId,
        req.file,
        req.user.id,
      );
      res
        .status(201)
        .json(responseFormat("success", attachment, "Attachment uploaded"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /attachments/:id
  async deleteAttachment(req, res) {
    try {
      const attachment = await attachmentService.deleteAttachment(
        parseInt(req.params.id),
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", attachment, "Attachment deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default attachmentController;
