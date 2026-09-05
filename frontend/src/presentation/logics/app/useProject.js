// services/logic/Project.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import projectApi from "@/services/api/project";

export const useProjectApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllProjects = (params) =>
    useQuery({
      queryKey: ["projects", params],
      queryFn: () => projectApi.findAll(params),
    });

  const useProjectById = (id) =>
    useQuery({
      queryKey: ["project", id],
      queryFn: () => projectApi.findOne(id),
      enabled: !!id,
    });

  const useProjectMembers = (id) =>
    useQuery({
      queryKey: ["project-members", id],
      queryFn: () => projectApi.getMembers(id),
      enabled: !!id,
    });

  const useProjectStatuses = (id) =>
    useQuery({
      queryKey: ["project-statuses", id],
      queryFn: () => projectApi.getStatuses(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createProject = useMutation({
    mutationFn: (payload) => projectApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });

  const updateProject = useMutation({
    mutationFn: ({ id, payload }) => projectApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["projects"]);
      queryClient.invalidateQueries(["project", id]);
    },
  });

  const deleteProject = useMutation({
    mutationFn: (id) => projectApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });

  const addProjectMember = useMutation({
    mutationFn: ({ id, payload }) => projectApi.addMember(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["project-members", id]);
    },
  });

  const removeProjectMember = useMutation({
    mutationFn: ({ id, userId }) => projectApi.removeMember(id, userId),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["project-members", id]);
    },
  });

  const createProjectStatus = useMutation({
    mutationFn: ({ id, payload }) => projectApi.createStatus(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["project-statuses", id]);
    },
  });

  return {
    useAllProjects,
    useProjectById,
    useProjectMembers,
    useProjectStatuses,
    createProject,
    updateProject,
    deleteProject,
    addProjectMember,
    removeProjectMember,
    createProjectStatus,
  };
};
