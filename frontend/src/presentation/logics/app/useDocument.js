// services/logic/Document.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import documentApi from "@/services/api/document";

export const useDocumentApi = () => {
  const queryClient = useQueryClient();

  // ===== QUERIES =====

  const useAllDocuments = (params) =>
    useQuery({
      queryKey: ["documents", params],
      queryFn: () => documentApi.findAll(params),
    });

  const useDocumentById = (id) =>
    useQuery({
      queryKey: ["document", id],
      queryFn: () => documentApi.findOne(id),
      enabled: !!id,
    });

  // ===== MUTATIONS =====

  const createDocument = useMutation({
    mutationFn: (payload) => documentApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["documents"]);
    },
  });

  const updateDocument = useMutation({
    mutationFn: ({ id, payload }) => documentApi.update(id, payload),
    onSuccess: (data, { id }) => {
      queryClient.invalidateQueries(["documents"]);
      queryClient.invalidateQueries(["document", id]);
    },
  });

  const deleteDocument = useMutation({
    mutationFn: (id) => documentApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["documents"]);
    },
  });

  const archiveDocument = useMutation({
    mutationFn: (id) => documentApi.archive(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["documents"]);
      queryClient.invalidateQueries(["document", id]);
    },
  });

  const restoreDocument = useMutation({
    mutationFn: (id) => documentApi.restore(id),
    onSuccess: (data, id) => {
      queryClient.invalidateQueries(["documents"]);
      queryClient.invalidateQueries(["document", id]);
    },
  });

  return {
    useAllDocuments,
    useDocumentById,
    createDocument,
    updateDocument,
    deleteDocument,
    archiveDocument,
    restoreDocument,
  };
};
