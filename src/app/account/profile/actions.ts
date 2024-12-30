'use server';

import { authenticatedAction } from '@/lib/safe-action';
import {
  createAddressUseCase,
  createPersonalInfoUseCase,
  getAddressUseCase,
  getPersonalInfoUseCase,
  updateAddressUseCase,
  updatePersonalInfoUseCase,
} from '@/use-cases/users';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const updatePersonalInfoAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      phoneNumber: z.string().min(1),
    }),
  )
  .handler(async ({ input, ctx }) => {
    const existingProfile = await getPersonalInfoUseCase(ctx.user.id);
    if (existingProfile) {
      await updatePersonalInfoUseCase(
        ctx.user.id,
        input.firstName,
        input.lastName,
        input.phoneNumber,
      );
    } else {
      await createPersonalInfoUseCase(
        ctx.user.id,
        input.firstName,
        input.lastName,
        input.phoneNumber,
      );
    }
    revalidatePath('/account/profile');
  });

export const updateAddressAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      streetAddress: z.string().min(1),
      apartment: z.string().min(1),
      city: z.string().min(1),
      postalCode: z.string().min(1),
    }),
  )
  .handler(async ({ input, ctx }) => {
    const existingAddress = await getAddressUseCase(ctx.user.id);
    if (existingAddress) {
      await updateAddressUseCase(
        ctx.user.id,
        input.streetAddress,
        input.apartment,
        input.city,
        input.postalCode,
      );
    } else {
      await createAddressUseCase(
        ctx.user.id,
        input.streetAddress,
        input.apartment,
        input.city,
        input.postalCode,
      );
    }
    revalidatePath('/account/profile');
  });
