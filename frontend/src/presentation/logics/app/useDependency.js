// services/logic/Dependency.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import dependencyApi from "@/services/api/dependency";

export const useDependencyApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useTaskDependencies = (taskId) =>
    useQuery({
      queryKey: ["dependencies", taskId],
      queryFn: () => dependencyApi.findByTask(taskId),
      enabled: !!taskId,
    });

  // ===== MUTATIONS =====

  const addDependency = useMutation({
    mutationFn: ({ taskId, payload }) => dependencyApi.create(taskId, payload),
    onSuccess: (data, { taskId }) => {
      queryClient.invalidateQueries(["dependencies", taskId]);
      queryClient.invalidateQueries(["task", taskId]);
    },
  });

  const removeDependency = useMutation({
    mutationFn: ({ taskId, dependencyId }) =>
      dependencyApi.remove(taskId, dependencyId),
    onSuccess: (data, { taskId }) => {
      queryClient.invalidateQueries(["dependencies", taskId]);
      queryClient.invalidateQueries(["task", taskId]);
    },
  });

  return {
    useTaskDependencies,
    addDependency,
    removeDependency,
  };
};
