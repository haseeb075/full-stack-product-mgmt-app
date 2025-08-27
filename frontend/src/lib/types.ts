export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stockQuantity: number;
  imageUrl: string | null;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stockQuantity: string;
  imageUrl: string;
  categoryIds: string[];
}

export interface ProductCategory {
  productId: string;
  categoryId: string;
}
