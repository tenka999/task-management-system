import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useWorkspaceApi } from "@/presentation/logics/app/useWorkspaceApi";
import { useUserPreferenceApi } from "@/presentation/logics/app/useUserPreference";
import { useQueryClient } from "@tanstack/react-query";
import { WorkspaceContext } from "./Context";
import workspaceStorage from "@/utils/workspace-strorage";

// const WorkspaceContext = createContext(null);

export const WorkspaceProvider = ({ children }) => {
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSwitching, setIsSwitching] = useState(false);

  const queryClient = useQueryClient();
  const { useAllWorkspaces } = useWorkspaceApi();
  const { useActiveWorkspace, setActiveWorkspaceMutation } =
    useUserPreferenceApi();

  // Fetch workspaces
  const { data: workspacesData, isLoading: isLoadingWorkspaces } =
    useAllWorkspaces();

  // Fetch active workspace from backend
  const { data: activeWorkspaceData, isLoading: isLoadingActive } =
    useActiveWorkspace();

  // Initialize active workspace
  useEffect(() => {
    const initializeWorkspace = async () => {
      setIsLoading(true);

      try {
        // Try to get from backend first
        if (activeWorkspaceData) {
          setActiveWorkspace(activeWorkspaceData);
          workspaceStorage.setActiveWorkspaceId(activeWorkspaceData.id);
        }
        // Fallback to local storage
        else {
          const storedWorkspaceId = workspaceStorage.getActiveWorkspaceId();

          if (storedWorkspaceId && workspacesData?.workspaces) {
            const storedWorkspace = workspacesData.workspaces.find(
              (w) => w.id === storedWorkspaceId,
            );
            if (storedWorkspace) {
              setActiveWorkspace(storedWorkspace);
            }
          }
          // Fallback to first workspace
          else if (workspacesData?.workspaces?.length > 0) {
            const firstWorkspace = workspacesData.workspaces[0];
            setActiveWorkspace(firstWorkspace);
            workspaceStorage.setActiveWorkspaceId(firstWorkspace.id);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initializeWorkspace();
  }, [activeWorkspaceData, workspacesData]);

  // Switch workspace
  const switchWorkspace = useCallback(
    async (workspaceId) => {
      if (isSwitching) return;

      setIsSwitching(true);
      setError(null);

      try {
        // Optimistic update
        const workspace = workspacesData?.workspaces?.find(
          (w) => w.id === workspaceId,
        );
        if (workspace) {
          setActiveWorkspace(workspace);
          workspaceStorage.setActiveWorkspaceId(workspaceId);
        }

        // Call API to persist
        const result = await setActiveWorkspaceMutation.mutateAsync({
          workspaceId,
        });

        setActiveWorkspace(result);
        workspaceStorage.setActiveWorkspaceId(result.id);

        // Invalidate all workspace-specific queries
        await Promise.all([
          queryClient.invalidateQueries(["projects"]),
          queryClient.invalidateQueries(["tasks"]),
          queryClient.invalidateQueries(["labels"]),
          queryClient.invalidateQueries(["sprints"]),
          queryClient.invalidateQueries(["documents"]),
          queryClient.invalidateQueries(["activities"]),
          queryClient.invalidateQueries(["notifications"]),
          queryClient.invalidateQueries(["workspace-members"]),
        ]);

        return result;
      } catch (err) {
        setError(err.message);
        // Rollback to previous workspace
        const storedWorkspaceId = workspaceStorage.getActiveWorkspaceId();
        if (storedWorkspaceId) {
          const previousWorkspace = workspacesData?.workspaces?.find(
            (w) => w.id === storedWorkspaceId,
          );
          if (previousWorkspace) {
            setActiveWorkspace(previousWorkspace);
          }
        }
        throw err;
      } finally {
        setIsSwitching(false);
      }
    },
    [workspacesData, setActiveWorkspaceMutation, queryClient, isSwitching],
  );

  // Refresh active workspace
  const refreshActiveWorkspace = useCallback(() => {
    queryClient.invalidateQueries(["active-workspace"]);
    queryClient.invalidateQueries(["workspaces"]);
  }, [queryClient]);

  // Clear workspace on logout
  const clearWorkspace = useCallback(() => {
    setActiveWorkspace(null);
    workspaceStorage.clearActiveWorkspace();
    queryClient.clear();
  }, [queryClient]);

  const value = {
    activeWorkspace,
    setActiveWorkspace,
    switchWorkspace,
    refreshActiveWorkspace,
    clearWorkspace,
    workspaces: workspacesData?.workspaces || [],
    totalWorkspaces: workspacesData?.total || 0,
    isLoading,
    isSwitching,
    error,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
};
export default WorkspaceContext;
