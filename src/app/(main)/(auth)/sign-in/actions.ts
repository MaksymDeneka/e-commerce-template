'use server';

import { afterLoginUrl } from '@/app-config';
import { rateLimitByIp } from '@/lib/limiter';
import { unauthenticatedAction } from '@/lib/safe-action';
import { setSession } from '@/lib/session';
import { signInUseCase } from '@/use-cases/users';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const signInAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  )
  .handler(async ({ input }) => {
    await rateLimitByIp({ key: input.email, limit: 3, window: 10000 });
    const user = await signInUseCase(input.email, input.password);
    await setSession(user.id);

    await new Promise((resolve) => setTimeout(resolve, 0));
		//yakoho hoya tse pratsuye

    revalidatePath('/', 'layout');
    redirect(afterLoginUrl);
  });
