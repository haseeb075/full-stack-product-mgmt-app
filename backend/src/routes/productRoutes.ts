// src/routes/productRoutes.ts
import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const router = Router();

// GET /products - list with optional pagination & category filter
router.get("/", getProducts);

// GET /products/:id - get single product
router.get("/:id", getProductById);

// POST /products - create new product
router.post("/create-product", createProduct);

// PUT /products/:id - update product
router.put("/:id", updateProduct);

// DELETE /products/:id - delete product
router.delete("/:id", deleteProduct);

export default router;
