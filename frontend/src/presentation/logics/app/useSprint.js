// services/logic/Sprint.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import sprintApi from "@/services/api/sprint";

export const useSprintApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllSprints = (projectId) =>
    useQuery({
      queryKey: ["sprints", projectId],
      queryFn: () => sprintApi.findAll(projectId),
      enabled: !!projectId,
    });

  const useSprintById = (id) =>
    useQuery({
      queryKey: ["sprint", id],
      queryFn: () => sprintApi.findOne(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createSprint = useMutation({
    mutationFn: (payload) => sprintApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["sprints"]);
    },
  });

  const updateSprint = useMutation({
    mutationFn: ({ id, payload }) => sprintApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["sprints"]);
      queryClient.invalidateQueries(["sprint", id]);
    },
  });

  const deleteSprint = useMutation({
    mutationFn: (id) => sprintApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["sprints"]);
    },
  });

  const addTaskToSprint = useMutation({
    mutationFn: ({ id, payload }) => sprintApi.addTask(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["sprint", id]);
    },
  });

  const removeTaskFromSprint = useMutation({
    mutationFn: ({ id, taskId }) => sprintApi.removeTask(id, taskId),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["sprint", id]);
    },
  });

  const completeSprint = useMutation({
    mutationFn: (id) => sprintApi.complete(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["sprints"]);
      queryClient.invalidateQueries(["sprint", id]);
    },
  });

  return {
    useAllSprints,
    useSprintById,
    createSprint,
    updateSprint,
    deleteSprint,
    addTaskToSprint,
    removeTaskFromSprint,
    completeSprint,
  };
};
