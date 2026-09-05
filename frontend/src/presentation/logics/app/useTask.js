// services/logic/Task.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import taskApi from "@/services/api/task";

export const useTaskApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllTasks = (params) =>
    useQuery({
      queryKey: ["tasks", params],
      queryFn: () => taskApi.findAll(params),
    });

  const useTaskById = (id) =>
    useQuery({
      queryKey: ["task", id],
      queryFn: () => taskApi.findOne(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createTask = useMutation({
    mutationFn: (payload) => taskApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const updateTask = useMutation({
    mutationFn: ({ id, payload }) => taskApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["task", id]);
    },
  });

  const deleteTask = useMutation({
    mutationFn: (id) => taskApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const updateTaskStatus = useMutation({
    mutationFn: ({ id, statusId }) => taskApi.updateStatus(id, statusId),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["task", id]);
    },
  });

  return {
    useAllTasks,
    useTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };
};
