import taskService from "../services/task-service.js";
import { responseFormat } from "../utils/helper.js";

const taskController = {
  // GET /tasks
  async getAllTasks(req, res) {
    try {
      const tasks = await taskService.getAllTasks(req.query);
      res
        .status(200)
        .json(responseFormat("success", tasks, "All tasks fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /tasks/:id
  async getTaskById(req, res) {
    try {
      const task = await taskService.getTaskById(req.params.id);
      res.status(200).json(responseFormat("success", task, "Task fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /tasks
  async createTask(req, res) {
    try {
      const task = await taskService.createTask(req.body, req.user.id);
      res.status(201).json(responseFormat("success", task, "Task created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /tasks/:id
  async updateTask(req, res) {
    try {
      const task = await taskService.updateTask(
        req.params.id,
        req.body,
        req.user.id,
      );
      res.status(200).json(responseFormat("success", task, "Task updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /tasks/:id
  async deleteTask(req, res) {
    try {
      const task = await taskService.deleteTask(req.params.id);
      res.status(200).json(responseFormat("success", task, "Task deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /tasks/:id/status
  async updateTaskStatus(req, res) {
    try {
      const task = await taskService.updateTaskStatus(
        req.params.id,
        req.body.statusId,
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", task, "Task status updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default taskController;
