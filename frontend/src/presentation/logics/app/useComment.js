// services/logic/Comment.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import commentApi from "@/services/api/comment";

export const useCommentApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useTaskComments = (taskId) =>
    useQuery({
      queryKey: ["comments", taskId],
      queryFn: () => commentApi.findByTask(taskId),
      enabled: !!taskId,
    });

  // ===== MUTATIONS =====

  const createComment = useMutation({
    mutationFn: ({ taskId, payload }) => commentApi.create(taskId, payload),
    onSuccess: (data, { taskId }) => {
      queryClient.invalidateQueries(["comments", taskId]);
      queryClient.invalidateQueries(["task", taskId]);
    },
  });

  const updateComment = useMutation({
    mutationFn: ({ id, payload }) => commentApi.update(id, payload),
    onSuccess: (data, { taskId }) => {
      queryClient.invalidateQueries(["comments", taskId]);
    },
  });

  const deleteComment = useMutation({
    mutationFn: ({ id, taskId }) => commentApi.remove(id),
    onSuccess: (data, { taskId }) => {
      queryClient.invalidateQueries(["comments", taskId]);
    },
  });

  return {
    useTaskComments,
    createComment,
    updateComment,
    deleteComment,
  };
};
