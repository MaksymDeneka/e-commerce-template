import crypto from 'crypto';
import { hashPassword } from './utils';
import { database } from '@/db';
import { accounts } from '@/db/schema/accounts';
import { eq } from 'drizzle-orm';
import { UserId } from '@/use-cases/types';

export async function createAccount(userId: number, password: string) {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = await hashPassword(password, salt);

  const [account] = await database
    .insert(accounts)
    .values({
      userId,
      accountType: 'email',
      role: 'user',
      password: hash,
      salt,
    })
    .returning();
  return account;
}

export async function createAccountViaGoogle(userId: UserId, googleId: string) {
  await database
    .insert(accounts)
    .values({
      userId: userId,
      accountType: "google",
			role: 'user',
      googleId,
    })
    .onConflictDoNothing()
    .returning();
}

export async function getAccountByUserId(userId: number) {
  const account = await database.query.accounts.findFirst({
    where: eq(accounts.userId, userId),
  });

  return account;
}

export async function getAccountByGoogleId(googleId: string) {
  return await database.query.accounts.findFirst({
    where: eq(accounts.googleId, googleId),
  });
}