
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../lib/api";
import { Product, Category } from "@/lib/types";


export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    // Optional: Add optimistic update
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousCategories = queryClient.getQueryData<Category[]>([
        "categories",
      ]);

      if (previousCategories) {
        queryClient.setQueryData<Category[]>(
          ["categories"],
          previousCategories.filter((category) => category.id !== id)
        );
      }

      return { previousCategories };
    },
    onError: (err, id, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(["categories"], context.previousCategories);
      }
    },
  });
};
