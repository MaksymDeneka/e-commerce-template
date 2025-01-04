'use server';

import { authenticatedAction } from '@/lib/safe-action';
import {
  createCategoryUseCase,
  deleteCategoryUseCase,
  toggleCategoryStatusUseCase,
  updateCategoryInfoUseCase,
} from '@/use-cases/categories';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { CreateCategorySchema, UpdateCategoryInfoSchema } from './validation';

export const createCategoryAction = authenticatedAction
  .createServerAction()
  .input(CreateCategorySchema)
  .handler(async ({ input: { name, slug, description, isActive } }) => {
    await createCategoryUseCase({ name, slug, isActive, description });
    revalidatePath('/dashboar/categories');
  });

export const toggleCategoryStatusAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.number(),
      isActive: z.boolean(),
    }),
  )
  .handler(async ({ input }) => {
    await toggleCategoryStatusUseCase(input.id, input.isActive);
  });

export const updateCategoryInfoAction = authenticatedAction
  .createServerAction()
  .input(UpdateCategoryInfoSchema)
  .handler(async ({ input: { id, name, slug, description } }) => {
    await updateCategoryInfoUseCase(id, { name, slug, description });

    revalidatePath(`/dashboar/categories`);
  });

export const deleteCategoryAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      categoryId: z.number(),
    }),
  )
  .handler(async ({ input }) => {
    await deleteCategoryUseCase(input.categoryId);
    revalidatePath(`/dashboar/categories`);
  });
