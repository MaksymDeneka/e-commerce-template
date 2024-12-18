import crypto from 'crypto';
import { hashPassword } from './utils';
import prisma from '@/db/prisma';

export async function createAccount(userId: string, password: string) {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = await hashPassword(password, salt);

  const account = await prisma.accounts.create({
    data: {
      userId,
      accountType: 'EMAIL',
      password: hash,
      salt,
    },
    // select: {
    //   id: true,
    //   userId: true,
    //   accountType: true,
    //   user: {
    //     select: {
    //       email: true,
    //       role: true,
    //     },
    //   },
    // },
  });

  return account;
}
