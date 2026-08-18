// hooks/api/useProfilPerusahaanApi.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import profilPerusahaanApi from "@/services/api/profileService";

export const useProfilPerusahaanApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllProfilPerusahaan = () =>
    useQuery({
      queryKey: ["profilPerusahaan"],
      queryFn: profilPerusahaanApi.findAll,
    });

  const useProfilPerusahaanById = (id) =>
    useQuery({
      queryKey: ["profilPerusahaan", id],
      queryFn: () => profilPerusahaanApi.findOne(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createProfilPerusahaan = useMutation({
    mutationFn: profilPerusahaanApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["profilPerusahaan"]);
    },
  });

  const updateProfilPerusahaan = useMutation({
    mutationFn: profilPerusahaanApi.update,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["profilPerusahaan"]);
      queryClient.invalidateQueries(["profilPerusahaan", variables.id]);
    },
  });

  const deleteProfilPerusahaan = useMutation({
    mutationFn: profilPerusahaanApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries(["profilPerusahaan"]);
    },
  });

  return {
    useAllProfilPerusahaan,
    useProfilPerusahaanById,
    createProfilPerusahaan,
    updateProfilPerusahaan,
    deleteProfilPerusahaan,
  };
};
