import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import invitationApi from "@/services/api/invitation";

export const useInvitationApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllInvitations = (params) =>
    useQuery({
      queryKey: ["invitations", params],
      queryFn: () => invitationApi.findAll(params),
      enabled: !!params?.workspaceId,
    });

  const useInvitationById = (id) =>
    useQuery({
      queryKey: ["invitation", id],
      queryFn: () => invitationApi.findOne(id),
      enabled: !!id,
    });

  const useInvitationByToken = (token) =>
    useQuery({
      queryKey: ["invitation-token", token],
      queryFn: () => invitationApi.findByToken(token),
      enabled: !!token,
    });

  const usePendingInvitations = (workspaceId) =>
    useQuery({
      queryKey: ["pending-invitations", workspaceId],
      queryFn: () => invitationApi.findPending(workspaceId),
      enabled: !!workspaceId,
    });

  const useInvitationsByEmail = (email) =>
    useQuery({
      queryKey: ["invitations-email", email],
      queryFn: () => invitationApi.findByEmail(email),
      enabled: !!email,
    });
  const useInvitationsByInvitedById = (invitedById) =>
    useQuery({
      queryKey: ["invitations-invitedById", invitedById],
      queryFn: () => invitationApi.findByInvitedById(invitedById),
      enabled: !!invitedById,
    });

  // ===== MUTATIONS =====

  const createInvitation = useMutation({
    mutationFn: (payload) => invitationApi.create(payload),
    onSuccess: (data, payload) => {
      queryClient.invalidateQueries(["invitations"]);
      queryClient.invalidateQueries([
        "pending-invitations",
        payload.workspaceId,
      ]);
    },
  });

  const resendInvitation = useMutation({
    mutationFn: (id) => invitationApi.resend(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["invitations"]);
      queryClient.invalidateQueries(["invitation", id]);
    },
  });

  const acceptInvitation = useMutation({
    mutationFn: (token) => invitationApi.accept(token),
    onSuccess: () => {
      queryClient.invalidateQueries(["invitations"]);
      queryClient.invalidateQueries(["invitation-token"]);
      queryClient.invalidateQueries(["workspaces"]);
      queryClient.invalidateQueries(["workspace-members"]);
    },
  });

  const declineInvitation = useMutation({
    mutationFn: (token) => invitationApi.decline(token),
    onSuccess: () => {
      queryClient.invalidateQueries(["invitations"]);
      queryClient.invalidateQueries(["invitation-token"]);
    },
  });

  const cancelInvitation = useMutation({
    mutationFn: (id) => invitationApi.cancel(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["invitations"]);
      queryClient.invalidateQueries(["pending-invitations"]);
    },
  });

  const deleteInvitation = useMutation({
    mutationFn: (id) => invitationApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["invitations"]);
    },
  });

  return {
    useAllInvitations,
    useInvitationById,
    useInvitationByToken,
    usePendingInvitations,
    useInvitationsByEmail,
    useInvitationsByInvitedById,
    createInvitation,
    resendInvitation,
    acceptInvitation,
    declineInvitation,
    cancelInvitation,
    deleteInvitation,
  };
};
