"use server"

import { authenticatedAction } from "@/lib/safe-action";
import { CreatePoductSchema } from "./validation";
import { createProductUseCase } from "@/use-cases/products";

export const createProductAction = authenticatedAction
.createServerAction()
.input(CreatePoductSchema)
.handler(async ({ input: { name, slug, description, price, compareAtPrice, quantity, categoryId, isPublished } }) => {
		await createProductUseCase({ name, slug, description, price, compareAtPrice, quantity, categoryId, isPublished });
		
	});