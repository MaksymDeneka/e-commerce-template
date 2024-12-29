'use server';

import { authenticatedAction } from '@/lib/safe-action';
import { createProfileUseCase, getProfileUseCase, updateProfileUseCase } from '@/use-cases/users';
import { z } from 'zod';

export const updateProfileAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      phoneNumber: z.string().min(1),
    }),
  )
  .handler(async ({ input, ctx }) => {
    // const existingProfile = await getProfileUseCase(ctx.user.id);
    // if (existingProfile) {
    //   await updateProfileUseCase(ctx.user.id, input.firstName, input.lastName, input.phoneNumber);
    // } else {
    //   await createProfileUseCase(ctx.user.id, input.firstName, input.lastName, input.phoneNumber);
    // }

    const existingProfile = await getProfileUseCase(ctx.user.id);

    if (existingProfile) {
      await updateProfileUseCase(ctx.user.id, input.firstName, input.lastName, input.phoneNumber);
    } else {
      await createProfileUseCase(ctx.user.id, input.firstName, input.lastName, input.phoneNumber);
    }
  });
