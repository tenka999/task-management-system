// services/logic/User.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "@/services/api/users";

export const useUserApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllUsers = (params) =>
    useQuery({
      queryKey: ["users", params],
      queryFn: () => userApi.findAll(params),
    });

  const useUserById = (id) =>
    useQuery({
      queryKey: ["user", id],
      queryFn: () => userApi.findOne(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createUser = useMutation({
    mutationFn: (payload) => userApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const updateUser = useMutation({
    mutationFn: ({ id, payload }) => userApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["users"]);
      queryClient.invalidateQueries(["user", id]);
    },
  });

  const updateUserPassword = useMutation({
    mutationFn: ({ id, payload }) => userApi.updatePassword(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["user", id]);
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id) => userApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  return {
    useAllUsers,
    useUserById,
    createUser,
    updateUser,
    updateUserPassword,
    deleteUser,
  };
};
