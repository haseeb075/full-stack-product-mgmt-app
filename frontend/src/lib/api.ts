// export async function fetcher<T>(
//     endpoint: string,
//     options?: RequestInit
//   ): Promise<T> {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
//       headers: { "Content-Type": "application/json" },
//       ...options,
//     });

//     if (!res.ok) {
//       const error = await res.json().catch(() => ({}));
//       throw new Error(error.error || "API Error");
//     }

//     return res.json();
//   }

//   // --------------------
//   // Products API
//   // --------------------

//   export interface Product {
//     id: string;
//     name: string;
//     description?: string;
//     price: number;
//     imageUrl?: string;
//     categoryId: string;
//   }

//   export async function getProducts(): Promise<Product[]> {
//     return fetcher<Product[]>("/products");
//   }

//   export async function getProductById(id: string): Promise<Product> {
//     return fetcher<Product>(`/products/${id}`);
//   }

//   export async function createProduct(data: Partial<Product>): Promise<Product> {
//     return fetcher<Product>("/products", {
//       method: "POST",
//       body: JSON.stringify(data),
//     });
//   }

//   // --------------------
//   // Categories API
//   // --------------------

//   export interface Category {
//     id: string;
//     name: string;
//     description?: string;
//   }

//   export async function getCategories(): Promise<Category[]> {
//     return fetcher<Category[]>("/categories");
//   }

//   export async function getCategoryById(id: string): Promise<Category> {
//     return fetcher<Category>(`/categories/${id}`);
//   }

//   export async function createCategory(data: Partial<Category>): Promise<Category> {
//     return fetcher<Category>("/categories", {
//       method: "POST",
//       body: JSON.stringify(data),
//     });
//   }

// React Query
import { Product, Category } from "@/lib/types";

// Product
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
  );
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
};

export const createProduct = async (data: any): Promise<Product> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/create-product`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

export const updateProduct = async (
  id: string,
  data: any
): Promise<Product> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

// Update your deleteProduct API function
export const deleteProduct = async (
  id: string
): Promise<{ message: string }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error ||
        errorData.message ||
        `Failed to delete product (${response.status})`
    );
  }

  return response.json();
};

// Categories

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`
  );
  if (!response.ok) throw new Error("Failed to fetch category");
  return response.json();
};

export const createCategory = async (data: {
  name: string;
  description?: string;
}): Promise<Category> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) throw new Error("Failed to create category");
  return response.json();
};

export const updateCategory = async (
  id: string,
  data: {
    name?: string;
    description?: string;
  }
): Promise<Category> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) throw new Error("Failed to update category");
  return response.json();
};

export const deleteCategory = async (
  id: string
): Promise<{ message: string }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error ||
        errorData.message ||
        `Failed to delete category (${response.status})`
    );
  }

  return response.json();
};
