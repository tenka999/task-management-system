const WORKSPACE_STORAGE_KEY = "activeWorkspaceId";

export const workspaceStorage = {
  // Get active workspace ID from local storage
  getActiveWorkspaceId: () => {
    try {
      const workspaceId = localStorage.getItem(WORKSPACE_STORAGE_KEY);
      return workspaceId ? JSON.parse(workspaceId) : null;
    } catch (error) {
      console.error("Error reading active workspace from storage:", error);
      return null;
    }
  },

  // Set active workspace ID to local storage
  setActiveWorkspaceId: (workspaceId) => {
    try {
      if (workspaceId) {
        localStorage.setItem(
          WORKSPACE_STORAGE_KEY,
          JSON.stringify(workspaceId),
        );
      } else {
        localStorage.removeItem(WORKSPACE_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error saving active workspace to storage:", error);
    }
  },

  // Clear active workspace
  clearActiveWorkspace: () => {
    try {
      localStorage.removeItem(WORKSPACE_STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing active workspace:", error);
    }
  },
};

export default workspaceStorage;
