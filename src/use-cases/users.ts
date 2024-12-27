import { createUser, getUserByEmail, verifyPassword } from '@/data-access/users';
import { LoginError, PublicError } from './errors';
import { createAccount, createAccountViaGoogle } from '@/data-access/accounts';
import { GoogleUser } from '@/app/api/login/google/callback/route';

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

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  if (!existingUser) {
    existingUser = await createUser(googleUser.email);
  }

  await createAccountViaGoogle(existingUser.id, googleUser.sub);

  // await createProfile(existingUser.id, googleUser.name, googleUser.picture);

  return existingUser.id;
}