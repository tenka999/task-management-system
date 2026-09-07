import SecureStorage from "@/helpers/SecureStorage";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import workspaceStorage from "@/utils/workspace-strorage";

const useConfig = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const Logout = async () => {
    SecureStorage.removeStorage("user");
    SecureStorage.removeStorage("token");
    workspaceStorage.clearActiveWorkspace();
    navigate("/login");
    queryClient.clear();
  };

  const getUser = () => {
    const user = {
      data: {
        first_name: "John",
        last_name: "Doe",
      },
    };
    return user.data;
  };

  return {
    Logout,
    getUser,
  };
};

export default useConfig;
