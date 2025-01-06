import { z } from "zod";

export const CreatePoductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be a positive number'),
  compareAtPrice: z.number().min(0, 'Compare at price must be a positive number').optional(),
  quantity: z.number().int().min(0, 'Quantity must be a non-negative integer'),
  categoryId: z.number().int().positive('Category is required'),
  isPublished: z.boolean(),
  // metadata: z.record(z.string(), z.any()).optional(),
});