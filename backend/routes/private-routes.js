import { Router } from "express";
import authMiddleWare from "../middlewares/auth.js";
import userRoleController from "../controllers/user-role-controller.js";
import userController from "../controllers/user-controller.js";
import workspaceController from "../controllers/workspace-controller.js";
import projectController from "../controllers/project-controller.js";
import taskController from "../controllers/task-controller.js";
import commentController from "../controllers/comment-controller.js";
import labelController from "../controllers/label-controller.js";
import sprintController from "../controllers/sprint-controller.js";
import notificationController from "../controllers/notification-controller.js";
import documentController from "../controllers/document-controller.js";
import attachmentController from "../controllers/attachment-controller.js";
import timeLogController from "../controllers/time-log-controller.js";
import activityController from "../controllers/activity-controller.js";
import dependencyController from "../controllers/depedency-controller.js";
import { upload } from "../middlewares/upload.js";
import { uploadWorkspaceLogo } from "../middlewares/upload-workspace-logo.js";

const privateRouter = Router();

privateRouter.use(authMiddleWare);

// //#region user
// privateRouter.get("/user", userController.getAllUsers);
// privateRouter.get("/user/:id", userController.getAllUserById);
// privateRouter.post("/user", userController.creaateRole);
// privateRouter.put("/user/:id", userController.updateRole);
// privateRouter.delete("/user/:id", userController.deleteUser);
// //#endregion user

//#region role
privateRouter.get("/role", userRoleController.getAllRole);
privateRouter.get("/role/:id", userRoleController.getAllRoleById);
privateRouter.post("/role", userRoleController.creaateRole);
privateRouter.put("/role/:id", userRoleController.updateRole);
privateRouter.delete("/role/:id", userRoleController.deleteRole);
//#endregion role

// #region users
privateRouter.get("/user", userController.getAllUsers);
privateRouter.get("/user/:id", userController.getUserById);
privateRouter.put("/user/:id", userController.updateUser);
privateRouter.put("/user/:id/password", userController.updatePassword);
privateRouter.delete("/user/:id", userController.deleteUser);
//#endregion users

//#region workspaces
privateRouter.get("/workspaces", workspaceController.getAllWorkspaces);
privateRouter.get("/workspace/:id", workspaceController.getWorkspaceById);
privateRouter.get(
  "/workspace/check-slug/:slug",
  workspaceController.getWorkspaceBySlug,
);
privateRouter.post(
  "/workspace",
  uploadWorkspaceLogo.single("logo"),
  workspaceController.createWorkspace,
);
privateRouter.put(
  "/workspace/:id",
  uploadWorkspaceLogo.single("logo"),
  workspaceController.updateWorkspace,
);
privateRouter.delete("/workspace/:id", workspaceController.deleteWorkspace);

// Workspace members
privateRouter.get(
  "/workspaces/:id/members",

  workspaceController.getWorkspaceMembers,
);
privateRouter.post(
  "/workspace/:id/members",

  workspaceController.addWorkspaceMember,
);
privateRouter.put(
  "/workspace/:id/members/:userId",

  workspaceController.updateWorkspaceMember,
);
privateRouter.delete(
  "/workspace/:id/members/:userId",

  workspaceController.removeWorkspaceMember,
);

// Invitations
privateRouter.post("/workspace/:id/invite", workspaceController.inviteMember);
//#endregion workspaces

//#region projects
privateRouter.get("/projects", projectController.getAllProjects);
privateRouter.get("/project/:id", projectController.getProjectById);
privateRouter.post("/project", projectController.createProject);
privateRouter.put("/project/:id", projectController.updateProject);
privateRouter.delete("/project/:id", projectController.deleteProject);

// Project members
privateRouter.get("/project/:id/members", projectController.getProjectMembers);
privateRouter.post("/project/:id/members", projectController.addProjectMember);
privateRouter.delete(
  "/project/:id/members/:userId",

  projectController.removeProjectMember,
);

// Task statuses
privateRouter.get("/project/:id/statuses", projectController.getTaskStatuses);
privateRouter.post("/project/:id/statuses", projectController.createTaskStatus);
//#endregion projects

//#region tasks
privateRouter.get("/tasks", taskController.getAllTasks);
privateRouter.get("/task/:id", taskController.getTaskById);
privateRouter.post("/task", taskController.createTask);
privateRouter.put("/task/:id", taskController.updateTask);
privateRouter.delete("/task/:id", taskController.deleteTask);
privateRouter.patch("/task/:id/status", taskController.updateTaskStatus);
//#endregion tasks

//#region comments
privateRouter.get(
  "/tasks/:taskId/comments",

  commentController.getTaskComments,
);
privateRouter.post(
  "/tasks/:taskId/comments",

  commentController.createComment,
);
privateRouter.put("/task/comments/:id", commentController.updateComment);
privateRouter.delete("/task/comments/:id", commentController.deleteComment);
//#endregion comments

//#region labels
privateRouter.get("/labels", labelController.getAllLabels);
privateRouter.get("/label/:id", labelController.getLabelById);
privateRouter.post("/label", labelController.createLabel);
privateRouter.put("/label/:id", labelController.updateLabel);
privateRouter.delete("/label/:id", labelController.deleteLabel);

// Task labels
privateRouter.post(
  "/tasks/:taskId/labels",

  labelController.addLabelToTask,
);
privateRouter.delete(
  "/tasks/:taskId/labels/:labelId",

  labelController.removeLabelFromTask,
);
//#endregion labels

//#region sprint
privateRouter.get("/sprint", sprintController.getAllSprints);
privateRouter.get("/sprint/:id", sprintController.getSprintById);
privateRouter.post("/sprint", sprintController.createSprint);
privateRouter.put("/sprint/:id", sprintController.updateSprint);
privateRouter.delete("/sprint/:id", sprintController.deleteSprint);
privateRouter.post("/sprint/:id/tasks", sprintController.addTaskToSprint);
privateRouter.delete(
  "/sprint/:id/tasks/:taskId",
  sprintController.removeTaskFromSprint,
);
privateRouter.patch("/sprint/:id/complete", sprintController.completeSprint);
//#endregion sprint

//#region notification
privateRouter.get("/notification", notificationController.getUserNotifications);
privateRouter.get(
  "/notification/unread-count",
  notificationController.getUnreadCount,
);
privateRouter.patch(
  "/notification/:id/read",
  notificationController.markAsRead,
);
privateRouter.patch(
  "/notification/read-all",
  notificationController.markAllAsRead,
);
privateRouter.delete(
  "/notification/:id",
  notificationController.deleteNotification,
);
privateRouter.delete(
  "/notification/clear-all",
  notificationController.clearAllNotifications,
);
//#endregion notification

//#region document
privateRouter.get("/document", documentController.getAllDocuments);
privateRouter.get("/document/:id", documentController.getDocumentById);
privateRouter.post("/document", documentController.createDocument);
privateRouter.put("/document/:id", documentController.updateDocument);
privateRouter.delete("/document/:id", documentController.deleteDocument);
privateRouter.patch(
  "/document/:id/archive",
  documentController.archiveDocument,
);
privateRouter.patch(
  "/document/:id/restore",
  documentController.restoreDocument,
);
//#endregion document

//#region attachment
privateRouter.get(
  "/attachment/task/:taskId",
  attachmentController.getTaskAttachments,
);
privateRouter.get("/attachment/:id", attachmentController.getAttachmentById);
privateRouter.post(
  "/attachment/task/:taskId",
  upload.single("file"),
  attachmentController.uploadAttachment,
);
privateRouter.delete("/attachment/:id", attachmentController.deleteAttachment);
//#endregion attachment

//#region time-log
privateRouter.get("/time-log/task/:taskId", timeLogController.getTaskTimeLogs);
privateRouter.get("/time-log/user", timeLogController.getUserTimeLogs);
privateRouter.post("/time-log/task/:taskId", timeLogController.createTimeLog);
privateRouter.put("/time-log/:id", timeLogController.updateTimeLog);
privateRouter.delete("/time-log/:id", timeLogController.deleteTimeLog);
//#endregion time-log

//#region activity
privateRouter.get(
  "/activity/workspace/:workspaceId",
  activityController.getWorkspaceActivity,
);
privateRouter.get("/activity/task/:taskId", activityController.getTaskActivity);
//#endregion activity

//#region dependency
privateRouter.get(
  "/dependency/task/:taskId",
  dependencyController.getTaskDependencies,
);
privateRouter.post(
  "/dependency/task/:taskId",
  dependencyController.addDependency,
);
privateRouter.delete(
  "/dependency/task/:taskId/:dependencyId",
  dependencyController.removeDependency,
);
//#endregion dependency

export default privateRouter;
