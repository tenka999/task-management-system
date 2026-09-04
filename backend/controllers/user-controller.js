import userService from "../services/user-service.js";
import { responseFormat } from "../utils/helper.js";

const userController = {
  // GET /users
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers(req.query);
      res
        .status(200)
        .json(responseFormat("success", users, "All users fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /users/:id
  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json(responseFormat("success", user, "User fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /users/:id
  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(responseFormat("success", user, "User updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /users/:id/password
  async updatePassword(req, res) {
    try {
      const user = await userService.updatePassword(req.params.id, req.body);
      res.status(200).json(responseFormat("success", user, "Password updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /users/:id
  async deleteUser(req, res) {
    try {
      const user = await userService.deleteUser(req.params.id);
      res.status(200).json(responseFormat("success", user, "User deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default userController;
