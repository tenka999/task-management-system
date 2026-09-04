import projectService from "../services/project-service.js";
import { responseFormat } from "../utils/helper.js";

const projectController = {
  // GET /projects
  async getAllProjects(req, res) {
    try {
      const { workspaceId } = req.query;
      const projects = await projectService.getAllProjects(
        workspaceId,
        req.query,
      );
      res
        .status(200)
        .json(responseFormat("success", projects, "All projects fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /projects/:id
  async getProjectById(req, res) {
    try {
      const project = await projectService.getProjectById(req.params.id);
      res
        .status(200)
        .json(responseFormat("success", project, "Project fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /projects
  async createProject(req, res) {
    try {
      const project = await projectService.createProject(req.body, req.user.id);
      res
        .status(201)
        .json(responseFormat("success", project, "Project created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /projects/:id
  async updateProject(req, res) {
    try {
      const project = await projectService.updateProject(
        req.params.id,
        req.body,
      );
      res
        .status(200)
        .json(responseFormat("success", project, "Project updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /projects/:id
  async deleteProject(req, res) {
    try {
      const project = await projectService.deleteProject(req.params.id);
      res
        .status(200)
        .json(responseFormat("success", project, "Project deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /projects/:id/members
  async getProjectMembers(req, res) {
    try {
      const members = await projectService.getProjectMembers(req.params.id);
      res
        .status(200)
        .json(responseFormat("success", members, "Project members fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /projects/:id/members
  async addProjectMember(req, res) {
    try {
      const member = await projectService.addProjectMember(req.params.id, {
        ...req.body,
        invitedById: req.user.id,
      });
      res.status(201).json(responseFormat("success", member, "Member added"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /projects/:id/members/:userId
  async removeProjectMember(req, res) {
    try {
      const result = await projectService.removeProjectMember(
        req.params.id,
        req.params.userId,
      );
      res.status(200).json(responseFormat("success", result, "Member removed"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /projects/:id/statuses
  async getTaskStatuses(req, res) {
    try {
      const statuses = await projectService.getTaskStatuses(req.params.id);
      res
        .status(200)
        .json(responseFormat("success", statuses, "Task statuses fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /projects/:id/statuses
  async createTaskStatus(req, res) {
    try {
      const status = await projectService.createTaskStatus(
        req.params.id,
        req.body,
      );
      res
        .status(201)
        .json(responseFormat("success", status, "Task status created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default projectController;
