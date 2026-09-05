// services/logic/Attachment.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import attachmentApi from "@/services/api/attachment";

export const useAttachmentApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useTaskAttachments = (taskId) =>
    useQuery({
      queryKey: ["attachments", taskId],
      queryFn: () => attachmentApi.findByTask(taskId),
      enabled: !!taskId,
    });

  // ===== MUTATIONS =====

  const uploadAttachment = useMutation({
    mutationFn: ({ taskId, formData }) =>
      attachmentApi.upload(taskId, formData),
    onSuccess: (data, { taskId }) => {
      queryClient.invalidateQueries(["attachments", taskId]);
      queryClient.invalidateQueries(["task", taskId]);
    },
  });

  const deleteAttachment = useMutation({
    mutationFn: ({ id, taskId }) => attachmentApi.remove(id),
    onSuccess: (data, { taskId }) => {
      queryClient.invalidateQueries(["attachments", taskId]);
    },
  });

  return {
    useTaskAttachments,
    uploadAttachment,
    deleteAttachment,
  };
};
