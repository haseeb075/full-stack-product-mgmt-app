// src/app/categories/page.tsx
"use client";

import { useState } from "react";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/hooks/useCategories";
import CategoryForm from "@/components/logic/CategoryForm";
import CategoryTable from "@/components/logic/CategoryTable";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types";

export default function CategoriesPage() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: categories = [], isLoading, error } = useCategories();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const handleSubmit = async (data: { name: string; description: string }) => {
    try {
      if (editingCategory) {
        await updateCategoryMutation.mutateAsync({
          id: editingCategory.id,
          data
        });
      } else {
        await createCategoryMutation.mutateAsync(data);
      }
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error("Error saving category:", error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      try {
        await deleteCategoryMutation.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Failed to delete category. It may be associated with products.");
      }
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  if (isLoading) return <div className="p-6">Loading categories...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button
          onClick={handleAddNew}
          disabled={isLoading}
        >
          Add Category
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingCategory ? "Edit Category" : "Add New Category"}
        description={editingCategory ? "Update the category details" : "Create a new category"}
        size="md"
      >
        <CategoryForm
          category={editingCategory}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={createCategoryMutation.isPending || updateCategoryMutation.isPending}
        />
      </Modal>

      <CategoryTable
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={deleteCategoryMutation.isPending}
        deletingId={deleteCategoryMutation.variables}
      />

      {/* Loading overlay for better UX */}
      {(createCategoryMutation.isPending || updateCategoryMutation.isPending || deleteCategoryMutation.isPending) && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p>Processing...</p>
          </div>
        </div>
      )}
    </div>
  );
}