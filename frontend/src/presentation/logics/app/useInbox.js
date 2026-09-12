import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import inboxApi from "@/services/api/inbox";

export const useInboxApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllInbox = (params) =>
    useQuery({
      queryKey: ["inbox", params],
      queryFn: () => inboxApi.findAll(params),
    });

  const useInboxById = (id) =>
    useQuery({
      queryKey: ["inbox", id],
      queryFn: () => inboxApi.findOne(id),
      enabled: !!id,
    });

  const useUnreadCount = () =>
    useQuery({
      queryKey: ["inbox-unread-count"],
      queryFn: inboxApi.getUnreadCount,
      refetchInterval: 30000, // Refresh every 30 seconds
    });

  const useUnreadCountByType = () =>
    useQuery({
      queryKey: ["inbox-unread-count-by-type"],
      queryFn: inboxApi.getUnreadCountByType,
      refetchInterval: 30000,
    });

  const useThread = (threadId) =>
    useQuery({
      queryKey: ["inbox-thread", threadId],
      queryFn: () => inboxApi.getThread(threadId),
      enabled: !!threadId,
    });

  const useStarredInbox = () =>
    useQuery({
      queryKey: ["inbox-starred"],
      queryFn: inboxApi.getStarred,
    });

  const useArchivedInbox = (params) =>
    useQuery({
      queryKey: ["inbox-archived", params],
      queryFn: () => inboxApi.getArchived(params),
    });

  // ===== MUTATIONS =====

  const createInbox = useMutation({
    mutationFn: (payload) => inboxApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["inbox"]);
      queryClient.invalidateQueries(["inbox-unread-count"]);
      queryClient.invalidateQueries(["inbox-unread-count-by-type"]);
    },
  });

  const sendMessage = useMutation({
    mutationFn: (payload) => inboxApi.sendMessage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["inbox"]);
      queryClient.invalidateQueries(["inbox-unread-count"]);
      queryClient.invalidateQueries(["inbox-unread-count-by-type"]);
    },
  });

  const replyInbox = useMutation({
    mutationFn: ({ id, payload }) => inboxApi.reply(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["inbox"]);
      queryClient.invalidateQueries(["inbox-thread", data.threadId]);
    },
  });

  const markAsRead = useMutation({
    mutationFn: (id) => inboxApi.markAsRead(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["inbox"]);
      queryClient.invalidateQueries(["inbox", id]);
      queryClient.invalidateQueries(["inbox-unread-count"]);
      queryClient.invalidateQueries(["inbox-unread-count-by-type"]);
    },
  });

  const markAllAsRead = useMutation({
    mutationFn: (payload) => inboxApi.markAllAsRead(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["inbox"]);
      queryClient.invalidateQueries(["inbox-unread-count"]);
      queryClient.invalidateQueries(["inbox-unread-count-by-type"]);
    },
  });

  const toggleStar = useMutation({
    mutationFn: (id) => inboxApi.toggleStar(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["inbox"]);
      queryClient.invalidateQueries(["inbox", id]);
      queryClient.invalidateQueries(["inbox-starred"]);
    },
  });

  const archiveInbox = useMutation({
    mutationFn: (id) => inboxApi.archive(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["inbox"]);
      queryClient.invalidateQueries(["inbox", id]);
      queryClient.invalidateQueries(["inbox-archived"]);
    },
  });

  const unarchiveInbox = useMutation({
    mutationFn: (id) => inboxApi.unarchive(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["inbox"]);
      queryClient.invalidateQueries(["inbox", id]);
      queryClient.invalidateQueries(["inbox-archived"]);
    },
  });

  const deleteInbox = useMutation({
    mutationFn: (id) => inboxApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["inbox"]);
      queryClient.invalidateQueries(["inbox-unread-count"]);
      queryClient.invalidateQueries(["inbox-unread-count-by-type"]);
    },
  });

  const deleteMultipleInbox = useMutation({
    mutationFn: (ids) => inboxApi.removes({ ids }),
    onSuccess: () => {
      queryClient.invalidateQueries(["inbox"]);
      queryClient.invalidateQueries(["inbox-unread-count"]);
    },
  });

  const permanentDeleteInbox = useMutation({
    mutationFn: (id) => inboxApi.permanentDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["inbox"]);
    },
  });

  return {
    useAllInbox,
    useInboxById,
    useUnreadCount,
    useUnreadCountByType,
    useThread,
    useStarredInbox,
    useArchivedInbox,
    createInbox,
    sendMessage,
    replyInbox,
    markAsRead,
    markAllAsRead,
    toggleStar,
    archiveInbox,
    unarchiveInbox,
    deleteInbox,
    deleteMultipleInbox,
    permanentDeleteInbox,
  };
};
