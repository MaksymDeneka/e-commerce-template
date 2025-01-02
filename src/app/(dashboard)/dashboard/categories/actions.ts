'use server';

import { authenticatedAction } from '@/lib/safe-action';
import { createCategoryUseCase } from '@/use-cases/categories';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const createCategoryAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      name: z.string().min(1, 'Name is required'),
      slug: z.string().min(1, 'Slug is required'),
      description: z.string().optional(),
      isActive: z.boolean(),
    }),
  )
  .handler(async ({ input }) => {
    await createCategoryUseCase(input.name, input.slug, input.isActive, input.description);
    revalidatePath('/dashboar/categories');
  });
