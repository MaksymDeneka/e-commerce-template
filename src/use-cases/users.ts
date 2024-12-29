import { createUser, getUserByEmail, verifyPassword } from '@/data-access/users';
import { LoginError, PublicError } from './errors';
import { createAccount, createAccountViaGoogle } from '@/data-access/accounts';
import { GoogleUser } from '@/app/api/login/google/callback/route';
import { UserId } from './types';
import { createProfile, getProfile, updateProfile } from '@/data-access/profiles';

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

  return existingUser.id;
}

// export async function getProfileUseCase(userId: UserId) {
//   const profile = await getProfile(userId);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   if (!profile) {
//     throw new PublicError("User not found");
//   }
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//   return profile;
// }

export async function getProfileUseCase(userId: UserId) {
  const profile = await getProfile(userId);
  // Changed to return null instead of throwing error for profile check
  return profile;
}

export async function updateProfileUseCase(
  userId: UserId,
  firstName: string,
  lastName: string,
  phoneNumber: string,
) {
  await updateProfile(userId, { firstName, lastName, phoneNumber });
}

export async function createProfileUseCase(
  userId: UserId,
  firstName: string,
  lastName: string,
  phoneNumber: string,
) {
  await createProfile(userId, firstName, lastName, phoneNumber);
}
