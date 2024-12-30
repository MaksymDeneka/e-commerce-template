import { createUser, getUserByEmail, verifyPassword } from '@/data-access/users';
import { LoginError, PublicError } from './errors';
import { createAccount, createAccountViaGoogle, getAccountByUserId } from '@/data-access/accounts';
import { GoogleUser } from '@/app/api/login/google/callback/route';
import { UserId } from './types';
import {
  createPersonalInfo,
  getPersonalInfo,
  updatePersonalInfo,
} from '@/data-access/personal-info';
import { createAddress, getAddress, updateAddress } from '@/data-access/addresses';

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

// export async function getPersonalInfoUseCase(userId: UserId) {
//   const profile = await getPersonalInfo(userId);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   if (!profile) {
//     throw new PublicError("User not found");
//   }
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//   return profile;
// }

export async function getPersonalInfoUseCase(userId: UserId) {

  const profile = await getPersonalInfo(userId);
  // Changed to return null instead of throwing error for profile check
  return profile;
}

export async function updatePersonalInfoUseCase(
  userId: UserId,
  firstName: string,
  lastName: string,
  phoneNumber: string,
) {
  await updatePersonalInfo(userId, { firstName, lastName, phoneNumber });
}

export async function createPersonalInfoUseCase(
  userId: UserId,
  firstName: string,
  lastName: string,
  phoneNumber: string,
) {
  await createPersonalInfo(userId, firstName, lastName, phoneNumber);
}

export async function getAddressUseCase(userId: UserId) {
  const address = await getAddress(userId);
  return address;
}

export async function updateAddressUseCase(
  userId: UserId,
  streetAddress: string,
  apartment: string,
  city: string,
  postalCode: string,
) {
  await updateAddress(userId, { streetAddress, apartment, city, postalCode });
}

export async function createAddressUseCase(
  userId: UserId,
  streetAddress: string,
  apartment: string,
  city: string,
  postalCode: string,
) {
  await createAddress(userId, streetAddress, apartment, city, postalCode);
}

export async function isAdminUseCase(userId: UserId){
	const accaunt = await getAccountByUserId(userId)

	if(!accaunt){
		throw new Error("No account found")
	}
	const isAdmin = accaunt.role === "admin"
	return isAdmin
}