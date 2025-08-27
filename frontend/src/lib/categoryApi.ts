// import { fetcher } from "./api";

// export interface Category {
//   id: number;
//   name: string;
//   description?: string;
// }

// // Get all categories
// export const getCategories = () => fetcher<Category[]>("/categories");

// // Get single category
// export const getCategoryById = (id: number) => fetcher<Category>(`/categories/${id}`);

// // Create category
// export const createCategory = (data: Partial<Category>) =>
//   fetcher<Category>("/categories", {
//     method: "POST",
//     body: JSON.stringify(data),
//   });

// // Update category
// export const updateCategory = (id: number, data: Partial<Category>) =>
//   fetcher<Category>(`/categories/${id}`, {
//     method: "PUT",
//     body: JSON.stringify(data),
//   });

// // Delete category
// export const deleteCategory = (id: number) =>
//   fetcher<{ message: string }>(`/categories/${id}`, { method: "DELETE" });
