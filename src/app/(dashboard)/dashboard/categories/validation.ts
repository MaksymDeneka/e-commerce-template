import { z } from "zod";

export const CreateCategorySchema = z.object({
	name: z.string().min(1, 'Name is required'),
	slug: z.string().min(1, 'Slug is required'),
	description: z.string().optional(),
	isActive: z.boolean(),
});

export const UpdateCategoryInfoSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
})