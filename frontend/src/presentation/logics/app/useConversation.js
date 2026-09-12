import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import conversationApi from "@/services/api/conversation";

export const useConversationApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllConversations = (params) =>
    useQuery({
      queryKey: ["conversations", params],
      queryFn: () => conversationApi.findAll(params),
    });

  const useConversationById = (id) =>
    useQuery({
      queryKey: ["conversation", id],
      queryFn: () => conversationApi.findOne(id),
      enabled: !!id,
    });

  const useConversationMessages = (id, params) =>
    useQuery({
      queryKey: ["conversation-messages", id, params],
      queryFn: () => conversationApi.getMessages(id, params),
      enabled: !!id,
      refetchInterval: 10000, // Poll every 10 seconds for new messages
    });

  const useConversationUnreadCount = () =>
    useQuery({
      queryKey: ["conversation-unread-count"],
      queryFn: conversationApi.getUnreadCount,
      refetchInterval: 30000,
    });

  // ===== MUTATIONS =====

  const createConversation = useMutation({
    mutationFn: (payload) => conversationApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
      queryClient.invalidateQueries(["conversation-unread-count"]);
    },
  });

  const getOrCreateDirectConversation = useMutation({
    mutationFn: ({ userId, payload }) =>
      conversationApi.getOrCreateDirect(userId, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["conversations"]);
      queryClient.setQueryData(["conversation", data.id], data);
    },
  });

  const updateConversation = useMutation({
    mutationFn: ({ id, payload }) => conversationApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["conversations"]);
      queryClient.invalidateQueries(["conversation", id]);
    },
  });

  const addParticipant = useMutation({
    mutationFn: ({ id, payload }) =>
      conversationApi.addParticipant(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["conversation", id]);
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const removeParticipant = useMutation({
    mutationFn: ({ id, userId }) =>
      conversationApi.removeParticipant(id, userId),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["conversation", id]);
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const markConversationAsRead = useMutation({
    mutationFn: (id) => conversationApi.markAsRead(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["conversations"]);
      queryClient.invalidateQueries(["conversation", id]);
      queryClient.invalidateQueries(["conversation-unread-count"]);
    },
  });

  const toggleConversationPin = useMutation({
    mutationFn: (id) => conversationApi.togglePin(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["conversations"]);
      queryClient.invalidateQueries(["conversation", id]);
    },
  });

  const toggleConversationMute = useMutation({
    mutationFn: (id) => conversationApi.toggleMute(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["conversations"]);
      queryClient.invalidateQueries(["conversation", id]);
    },
  });

  const archiveConversation = useMutation({
    mutationFn: (id) => conversationApi.archive(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["conversations"]);
      queryClient.invalidateQueries(["conversation", id]);
    },
  });

  const closeConversation = useMutation({
    mutationFn: (id) => conversationApi.close(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["conversations"]);
      queryClient.invalidateQueries(["conversation", id]);
    },
  });

  const deleteConversation = useMutation({
    mutationFn: (id) => conversationApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
      queryClient.invalidateQueries(["conversation-unread-count"]);
    },
  });

  return {
    useAllConversations,
    useConversationById,
    useConversationMessages,
    useConversationUnreadCount,
    createConversation,
    getOrCreateDirectConversation,
    updateConversation,
    addParticipant,
    removeParticipant,
    markConversationAsRead,
    toggleConversationPin,
    toggleConversationMute,
    archiveConversation,
    closeConversation,
    deleteConversation,
  };
};
