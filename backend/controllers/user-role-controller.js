// controllers/reviewController.js
import userRoleService from "../services/user-role-service.js";
import { responseFormat } from "../utils/helper.js";

const userRoleController = {
  // GET /reviews
  async getAllRole(req, res) {
    try {
      const reviews = await userRoleService.getAllRole();
      res
        .status(200)
        .json(responseFormat("success", reviews, "All role fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /reviews/book/:bookId
  async getAllRoleById(req, res) {
    try {
      const reviews = await userRoleService.getAllRoleById(
        parseInt(req.params.bookId),
      );
      res
        .status(200)
        .json(responseFormat("success", reviews, "Reviews by book fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async creaateRole(req, res) {
    try {
      const genre = await userRoleService.createRole(req.body, req.user?.id);
      res.status(201).json(responseFormat("success", genre, "Genre created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /genres/:id
  async updateRole(req, res) {
    try {
      const genre = await userRoleService.updateRole(
        parseInt(req.params.id),
        req.body,
        req.user?.id,
      );
      res.status(200).json(responseFormat("success", genre, "Genre updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /reviews/:id
  async deleteRole(req, res) {
    try {
      const review = await userRoleService.deleteRole(
        parseInt(req.params.id),
        req.user?.id,
      );
      res.status(200).json(responseFormat("success", review, "Review deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default userRoleController;
