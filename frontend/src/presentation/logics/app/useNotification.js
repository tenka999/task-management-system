// services/logic/Notification.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import notificationApi from "@/services/api/notification";

export const useNotificationApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllNotifications = (params) =>
    useQuery({
      queryKey: ["notifications", params],
      queryFn: () => notificationApi.findAll(params),
    });

  const useUnreadCount = () =>
    useQuery({
      queryKey: ["notifications-unread"],
      queryFn: notificationApi.getUnreadCount,
      refetchInterval: 30000, // Refetch every 30 seconds
    });

  // ===== MUTATIONS =====

  const markNotificationAsRead = useMutation({
    mutationFn: (id) => notificationApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["notifications-unread"]);
    },
  });

  const markAllNotificationsAsRead = useMutation({
    mutationFn: () => notificationApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["notifications-unread"]);
    },
  });

  const deleteNotification = useMutation({
    mutationFn: (id) => notificationApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["notifications-unread"]);
    },
  });

  const clearAllNotifications = useMutation({
    mutationFn: () => notificationApi.clearAll(),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["notifications-unread"]);
    },
  });

  return {
    useAllNotifications,
    useUnreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    clearAllNotifications,
  };
};
