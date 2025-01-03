'use server';

import { authenticatedAction } from '@/lib/safe-action';
import { createCategoryUseCase, deleteCategoryUseCase, toggleCategoryStatusUseCase, updateCategoryUseCase } from '@/use-cases/categories';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const createCategoryAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      description: z.string().optional(),
      isActive: z.boolean(),
    }),
  )
  .handler(async ({ input }) => {
    await createCategoryUseCase(input.name, input.slug, input.isActive, input.description);
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

export const updateCategoryAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.number(),
      name: z.string().min(1),
      slug: z.string().min(1),
      description: z.string().optional(),
    }),
  )
  .handler(async ({ input }) => {
    await updateCategoryUseCase(input.id, input.name, input.slug, input.description);
  });

export const deleteCategoryAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      id: z.number(),
    }),
  )
  .handler(async ({ input }) => {
    await deleteCategoryUseCase(input.id);
  });
