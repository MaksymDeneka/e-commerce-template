import { createUser, getUserByEmail } from '@/data-access/users';
import { PublicError } from './errors';
import { createAccount } from '@/data-access/accounts';

export async function registerUserUseCase(email: string, password: string) {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new PublicError('An user with that email already exists.');
  }

  const user = await createUser(email);
	await createAccount(user.id, password);

  return { id: user.id };
}
