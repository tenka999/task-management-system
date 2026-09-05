// services/logic/ActivityLog.js

import { useQuery } from "@tanstack/react-query";
import activityLogApi from "@/services/api/activityLog";

export const useActivityLogApi = () => {
  // ===== QUERIES =====

  const useWorkspaceActivities = (workspaceId, params) =>
    useQuery({
      queryKey: ["activities", workspaceId, params],
      queryFn: () => activityLogApi.findByWorkspace(workspaceId, params),
      enabled: !!workspaceId,
    });

  const useTaskActivities = (taskId) =>
    useQuery({
      queryKey: ["task-activities", taskId],
      queryFn: () => activityLogApi.findByTask(taskId),
      enabled: !!taskId,
    });

  return {
    useWorkspaceActivities,
    useTaskActivities,
  };
};
