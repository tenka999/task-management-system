// services/logic/Label.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import labelApi from "@/services/api/label";

export const useLabelApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllLabels = (workspaceId) =>
    useQuery({
      queryKey: ["labels", workspaceId],
      queryFn: () => labelApi.findAll(workspaceId),
      enabled: !!workspaceId,
    });

  const useLabelById = (id) =>
    useQuery({
      queryKey: ["label", id],
      queryFn: () => labelApi.findOne(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createLabel = useMutation({
    mutationFn: (payload) => labelApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["labels"]);
    },
  });

  const updateLabel = useMutation({
    mutationFn: ({ id, payload }) => labelApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["labels"]);
      queryClient.invalidateQueries(["label", id]);
    },
  });

  const deleteLabel = useMutation({
    mutationFn: (id) => labelApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["labels"]);
    },
  });

  const addLabelToTask = useMutation({
    mutationFn: ({ taskId, payload }) => labelApi.addToTask(taskId, payload),
    onSuccess: (data, { taskId }) => {
      queryClient.invalidateQueries(["task", taskId]);
    },
  });

  const removeLabelFromTask = useMutation({
    mutationFn: ({ taskId, labelId }) =>
      labelApi.removeFromTask(taskId, labelId),
    onSuccess: (data, { taskId }) => {
      queryClient.invalidateQueries(["task", taskId]);
    },
  });

  return {
    useAllLabels,
    useLabelById,
    createLabel,
    updateLabel,
    deleteLabel,
    addLabelToTask,
    removeLabelFromTask,
  };
};
