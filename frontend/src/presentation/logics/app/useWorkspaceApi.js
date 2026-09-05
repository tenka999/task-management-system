// services/logic/Workspace.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import workspaceApi from "@/services/api/workspace";

export const useWorkspaceApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllWorkspaces = (params) =>
    useQuery({
      queryKey: ["workspaces", params],
      queryFn: () => workspaceApi.findAll(params),
    });

  const useWorkspaceById = (id) =>
    useQuery({
      queryKey: ["workspace", id],
      queryFn: () => workspaceApi.findOne(id),
      enabled: !!id,
    });
  const useWorkspaceBySlug = (slug) =>
    useQuery({
      queryKey: ["workspace", slug],
      queryFn: () => workspaceApi.findBySlug(slug),
      enabled: !!slug,
    });

  const useWorkspaceMembers = (id) =>
    useQuery({
      queryKey: ["workspace-members", id],
      queryFn: () => workspaceApi.getMembers(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createWorkspace = useMutation({
    mutationFn: (payload) => workspaceApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces"]);
    },
  });

  const updateWorkspace = useMutation({
    mutationFn: ({ id, payload }) => workspaceApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["workspaces"]);
      queryClient.invalidateQueries(["workspace", id]);
    },
  });

  const deleteWorkspace = useMutation({
    mutationFn: (id) => workspaceApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["workspaces"]);
    },
  });

  const addWorkspaceMember = useMutation({
    mutationFn: ({ id, payload }) => workspaceApi.addMember(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["workspace-members", id]);
    },
  });

  const updateWorkspaceMember = useMutation({
    mutationFn: ({ id, userId, payload }) =>
      workspaceApi.updateMember(id, userId, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["workspace-members", id]);
    },
  });

  const removeWorkspaceMember = useMutation({
    mutationFn: ({ id, userId }) => workspaceApi.removeMember(id, userId),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["workspace-members", id]);
    },
  });

  const inviteWorkspaceMember = useMutation({
    mutationFn: ({ id, payload }) => workspaceApi.inviteMember(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["workspace-members", id]);
    },
  });

  return {
    useAllWorkspaces,
    useWorkspaceById,
    useWorkspaceBySlug,
    useWorkspaceMembers,
    createWorkspace,
    updateWorkspace,
    deleteWorkspace,
    addWorkspaceMember,
    updateWorkspaceMember,
    removeWorkspaceMember,
    inviteWorkspaceMember,
  };
};
