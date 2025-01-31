'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { registerUserUseCase } from '@/use-cases/users';
import { afterLoginUrl } from '@/app-config';
import { setSession } from '@/lib/session';
import { unauthenticatedAction } from '@/lib/safe-action';
import { rateLimitByIp } from '@/lib/limiter';
import { revalidatePath } from 'next/cache';

export const signUpAction = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  )
  .handler(async ({ input }) => {
    await rateLimitByIp({ key: 'register', limit: 3, window: 30000 });
    const user = await registerUserUseCase(input.email, input.password);
    await setSession(user.id);
    await new Promise((resolve) => setTimeout(resolve, 0));
    //yakoho hoya tse pratsuye

    revalidatePath('/', 'layout');
    return redirect(afterLoginUrl);
  });
