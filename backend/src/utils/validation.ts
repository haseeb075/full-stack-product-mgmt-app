import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  categories: z.array(z.string().uuid()).optional()
});
