import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma";

// ✅ Get all categories
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

// ✅ Create a new category
export const createCategory = async (
  req: Request<{}, {}, { name: string }>, // only body type matters here
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: "Category name is required" });
      return;
    }

    const category = await prisma.category.create({
      data: { name },
    });

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// Update a category
export const updateCategory = async (
  req: Request<{ id: string }, {}, { name: string }>,
  res: Response, // Allow any response shape
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// Delete a category
export const deleteCategory = async (
  req: Request<{ id: string }>,
  res: Response<{ message: string } | { error: string }>,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id },
    });

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

