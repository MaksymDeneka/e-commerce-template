'use server';

import { afterLoginUrl } from '@/app-config';
import { setSession } from '@/lib/sessions';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const inputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});


export async function signUpAction(input: z.infer<typeof inputSchema>) {
  const validatedInput = inputSchema.parse(input);

  // Register user
  const user = await registerUserUseCase(validatedInput.email, validatedInput.password);

  // Set session
  await setSession(user.id);

  // Redirect
  redirect(afterLoginUrl);
}
