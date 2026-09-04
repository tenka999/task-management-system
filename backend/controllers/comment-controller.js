import commentService from "../services/comment-service.js";
import { responseFormat } from "../utils/helper.js";

const commentController = {
  // GET /tasks/:taskId/comments
  async getTaskComments(req, res) {
    try {
      const comments = await commentService.getTaskComments(req.params.taskId);
      res
        .status(200)
        .json(responseFormat("success", comments, "Comments fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /tasks/:taskId/comments
  async createComment(req, res) {
    try {
      const comment = await commentService.createComment(
        req.params.taskId,
        req.body,
        req.user.id,
      );
      res
        .status(201)
        .json(responseFormat("success", comment, "Comment created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /comments/:id
  async updateComment(req, res) {
    try {
      const comment = await commentService.updateComment(
        parseInt(req.params.id),
        req.body,
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", comment, "Comment updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /comments/:id
  async deleteComment(req, res) {
    try {
      const comment = await commentService.deleteComment(
        parseInt(req.params.id),
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", comment, "Comment deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default commentController;
