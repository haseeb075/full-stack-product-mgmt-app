import { Request, Response } from "express";
import prisma from "../utils/prisma";

// Create a Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stockQuantity, imageUrl, categoryIds } =
      req.body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price, // string or number accepted, Prisma will coerce if stringified properly
        stockQuantity,
        imageUrl,
        categories: {
          create: categoryIds?.map((categoryId: string) => ({
            category: { connect: { id: categoryId } },
          })),
        },
      },
      include: {
        categories: {
          include: { category: true },
        },
      },
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: { include: { category: true } },
      },
    });
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get Product By ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: { categories: { include: { category: true } } },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, stockQuantity, imageUrl, categoryIds } =
      req.body;

    // Update product details
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        stockQuantity,
        imageUrl,
        categories: categoryIds
          ? {
              deleteMany: {}, // remove existing relations
              create: categoryIds.map((categoryId: string) => ({
                categoryId,
              })),
            }
          : undefined,
      },
      include: { categories: { include: { category: true } } },
    });

    res.json(updatedProduct);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Use a transaction to ensure both operations succeed or fail together
    await prisma.$transaction(async (tx) => {
      // First, delete all product-category relationships
      await tx.productCategory.deleteMany({
        where: { productId: id },
      });

      // Then delete the product
      await tx.product.delete({
        where: { id },
      });
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Delete product error:", error);
    
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Product not found" });
    }
    
    res.status(500).json({ error: "Internal server error" });
  }
};