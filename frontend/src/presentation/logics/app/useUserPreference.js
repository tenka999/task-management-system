import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userPreferenceApi from "@/services/api/userPreference";

export const useUserPreferenceApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useUserPreferences = () =>
    useQuery({
      queryKey: ["user-preferences"],
      queryFn: () => userPreferenceApi.findOne(),
    });

  const useActiveWorkspace = () =>
    useQuery({
      queryKey: ["active-workspace"],
      queryFn: () => userPreferenceApi.findActiveWorkspace(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });

  // ===== MUTATIONS =====

  const setActiveWorkspaceMutation = useMutation({
    mutationFn: (payload) => userPreferenceApi.setActiveWorkspace(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["active-workspace"], data);
      queryClient.invalidateQueries(["user-preferences"]);

      // Invalidate workspace-specific data
      queryClient.invalidateQueries(["projects"]);
      queryClient.invalidateQueries(["tasks"]);
      queryClient.invalidateQueries(["labels"]);
      queryClient.invalidateQueries(["sprints"]);
      queryClient.invalidateQueries(["documents"]);
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["activities"]);
    },
  });

  return {
    useUserPreferences,
    useActiveWorkspace,
    setActiveWorkspaceMutation,
  };
};
