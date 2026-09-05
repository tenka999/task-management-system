// services/logic/TimeLog.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import timeLogApi from "@/services/api/timeLog";

export const useTimeLogApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useTaskTimeLogs = (taskId) =>
    useQuery({
      queryKey: ["time-logs", taskId],
      queryFn: () => timeLogApi.findByTask(taskId),
      enabled: !!taskId,
    });

  const useUserTimeLogs = (params) =>
    useQuery({
      queryKey: ["user-time-logs", params],
      queryFn: () => timeLogApi.findByUser(params),
    });

  // ===== MUTATIONS =====

  const createTimeLog = useMutation({
    mutationFn: ({ taskId, payload }) => timeLogApi.create(taskId, payload),
    onSuccess: (data, { taskId }) => {
      queryClient.invalidateQueries(["time-logs", taskId]);
      queryClient.invalidateQueries(["task", taskId]);
    },
  });

  const updateTimeLog = useMutation({
    mutationFn: ({ id, payload }) => timeLogApi.update(id, payload),
    onSuccess: (data, { taskId }) => {
      queryClient.invalidateQueries(["time-logs", taskId]);
      queryClient.invalidateQueries(["user-time-logs"]);
    },
  });

  const deleteTimeLog = useMutation({
    mutationFn: ({ id, taskId }) => timeLogApi.remove(id),
    onSuccess: (data, { taskId }) => {
      queryClient.invalidateQueries(["time-logs", taskId]);
      queryClient.invalidateQueries(["user-time-logs"]);
    },
  });

  return {
    useTaskTimeLogs,
    useUserTimeLogs,
    createTimeLog,
    updateTimeLog,
    deleteTimeLog,
  };
};
