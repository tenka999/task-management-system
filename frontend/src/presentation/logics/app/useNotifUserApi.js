import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import notifApi from "@/services/api/notifUser";

export const useNotifUserApi = () => {
  const queryClient = useQueryClient();

  // =========================
  // 🔹 QUERIES
  // =========================

  // ✅ Get notif user (dengan filter status)
  const useNotif = (params = {}) =>
    useQuery({
      queryKey: ["notif", params],
      queryFn: () => notifApi.getNotif(params),
    });

  // ✅ Get notif by ID
  const useNotifById = (id) =>
    useQuery({
      queryKey: ["notif", "detail", id],
      queryFn: () => notifApi.findOne(id),
      enabled: !!id,
    });

  // ✅ Get count (badge 🔔)
  const useNotifCount = () =>
    useQuery({
      queryKey: ["notif", "count"],
      queryFn: notifApi.getCount,
    });

  // =========================
  // 🔥 MUTATIONS
  // =========================

  // ✅ Create notif
  const createNotif = useMutation({
    mutationFn: (payload) => notifApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notif"] });
    },
  });

  // 🔥 MARK AS READ (1)
  const markNotifRead = useMutation({
    mutationFn: (id) => notifApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notif"] });
      queryClient.invalidateQueries({ queryKey: ["notif", "count"] });
    },
  });

  // 🔥 MARK AS UNREAD
  const markNotifUnread = useMutation({
    mutationFn: (id) => notifApi.markAsUnread(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notif"] });
      queryClient.invalidateQueries({ queryKey: ["notif", "count"] });
    },
  });

  // 🔥 MARK ALL
  const markAllAsRead = useMutation({
    mutationFn: () => notifApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notif"] });
      queryClient.invalidateQueries({ queryKey: ["notif", "count"] });
    },
  });

  // 🔥 BULK MARK
  const bulkMarkAsRead = useMutation({
    mutationFn: (ids) => notifApi.bulkMarkAsRead(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notif"] });
      queryClient.invalidateQueries({ queryKey: ["notif", "count"] });
    },
  });

  // 🔥 DELETE 1
  const deleteNotif = useMutation({
    mutationFn: (id) => notifApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notif"] });
      queryClient.invalidateQueries({ queryKey: ["notif", "count"] });
    },
  });

  // 🔥 BULK DELETE
  const bulkDeleteNotif = useMutation({
    mutationFn: (ids) => notifApi.bulkDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notif"] });
      queryClient.invalidateQueries({ queryKey: ["notif", "count"] });
    },
  });

  // 🔥 DELETE GLOBAL (admin)
  const deleteGlobalNotif = useMutation({
    mutationFn: (id) => notifApi.deleteGlobal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notif"] });
      queryClient.invalidateQueries({ queryKey: ["notif", "count"] });
    },
  });

  const softDeleteNotif = useMutation({
    mutationFn: (userId, notifId) => notifApi.softDeleteNotif(userId, notifId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notif"] });
      queryClient.invalidateQueries({ queryKey: ["notif"] });
    },
  });

  const bulkSoftDeleteNotif = useMutation({
    mutationFn: (ids) => notifApi.bulkSoftDelete(ids),
    onSuccess: () => {
      queryClient.invalidateQueries(["notif"]);
    },
  });

  // =========================
  // RETURN
  // =========================

  return {
    // queries
    useNotif,
    useNotifById,
    useNotifCount,

    // mutations
    createNotif,
    markNotifRead,
    markNotifUnread,
    markAllAsRead,
    bulkMarkAsRead,
    deleteNotif,
    bulkDeleteNotif,
    deleteGlobalNotif,
    softDeleteNotif,
    bulkSoftDeleteNotif,
  };
};
