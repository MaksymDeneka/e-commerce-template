import { createUser, getUserByEmail, verifyPassword } from '@/data-access/users';
import { LoginError, PublicError } from './errors';
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

export async function signInUseCase(email: string, password: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new LoginError();
  }
  const isPasswordCorrect = await verifyPassword(email, password);

  if (!isPasswordCorrect) {
    throw new LoginError();
  }

  return { id: user.id };
}
