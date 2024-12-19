import prisma from '@/db/prisma';
import { getAccountByUserId } from './accounts';
import { hashPassword } from './utils';

export async function createUser(email: string) {
  const user = await prisma.users.create({
    data: {
      email,
    },
  });
  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });
  return user;
}

export async function verifyPassword(email: string, plainTextPassword: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    return false;
  }

  const account = await getAccountByUserId(user.id);

  if (!account) {
    return false;
  }

  const salt = account.salt;
  const savedPassword = account.password;

  if (!salt || !savedPassword) {
    return false;
  }

  const hash = await hashPassword(plainTextPassword, salt);
  return account.password == hash;
}