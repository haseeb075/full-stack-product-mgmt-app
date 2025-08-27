"use client";

import { useState } from "react";
import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useCategories,
} from "@/hooks/useProducts";
import ProductTable from "@/components/logic/ProductTable";
import ProductForm from "@/components/logic/ProductForm";
import { Product } from "@/lib/types";

export default function ProductsPage() {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Use React Query hooks
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductMutation = useDeleteProduct();

  const handleAddProduct = async (formData: {
    name: string;
    description: string;
    price: string;
    stockQuantity: string;
    imageUrl: string;
    categoryIds: string[];
  }) => {
    try {
      await createProductMutation.mutateAsync({
        name: formData.name,
        description: formData.description || undefined,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        imageUrl: formData.imageUrl || undefined,
        categoryIds: formData.categoryIds,
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleUpdateProduct = async (formData: {
    name: string;
    description: string;
    price: string;
    stockQuantity: string;
    imageUrl: string;
    categoryIds: string[];
  }) => {
    if (!editingProduct) return;

    try {
      await updateProductMutation.mutateAsync({
        id: editingProduct.id,
        data: {
          name: formData.name,
          description: formData.description || undefined,
          price: parseFloat(formData.price),
          stockQuantity: parseInt(formData.stockQuantity),
          imageUrl: formData.imageUrl || undefined,
          categoryIds: formData.categoryIds,
        },
      });
      setEditingProduct(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // In your ProductsPage component
  const handleDeleteProduct = async (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this product? This will also remove all category associations."
      )
    ) {
      try {
        await deleteProductMutation.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting product:", error);

        // Show user-friendly error message
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to delete product due to database constraints";

        alert(`Error: ${errorMessage}`);
      }
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  if (productsLoading || categoriesLoading) {
    return <p className="p-6">Loading products...</p>;
  }

  if (productsError) {
    return (
      <p className="p-6 text-red-500">
        Error loading products: {productsError.message}
      </p>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={handleCancel}
          isLoading={
            createProductMutation.isPending || updateProductMutation.isPending
          }
        />
      )}

      <ProductTable
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        isLoading={deleteProductMutation.isPending}
      />
    </div>
  );
}
