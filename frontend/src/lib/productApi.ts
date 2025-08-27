// import { fetcher } from "./api";
// import { Product, Category } from "./types";

// // Get all products with categories
// export const getProducts = () => fetcher<Product[]>("/products");

// // Get single product with categories
// export const getProductById = (id: string) =>
//   fetcher<Product>(`/products/${id}`);

// // Get all categories
// export const getCategories = () => fetcher<Category[]>("/categories");

// // Create product
// export const createProduct = (data: {
//   name: string;
//   description?: string;
//   price: number;
//   stockQuantity: number;
//   imageUrl?: string;
//   categoryIds: string[];
// }) =>
//   fetcher<Product>("/products/create-product", {
//     method: "POST",
//     body: JSON.stringify(data),
//   });

// // Update product
// export const updateProduct = (
//   id: string,
//   data: {
//     name?: string;
//     description?: string;
//     price?: number;
//     stockQuantity?: number;
//     imageUrl?: string;
//     categoryIds?: string[];
//   }
// ) =>
//   fetcher<Product>(`/products/${id}`, {
//     method: "PUT",
//     body: JSON.stringify(data),
//   });

// // Delete product
// export const deleteProduct = (id: string) =>
//   fetcher<{ message: string }>(`/products/${id}`, { method: "DELETE" });
