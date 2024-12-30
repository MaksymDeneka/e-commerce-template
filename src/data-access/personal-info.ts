import { database } from '@/db';
import { Profile, profiles } from '@/db/schema';
import { UserId } from '@/use-cases/types';
import { eq } from 'drizzle-orm';

export async function getPersonalInfo(userId: UserId) {
  return await database
    .select()
    .from(profiles)
    .where(eq(profiles.userId, userId))
    .then((rows) => rows[0] || '');
}

export async function updatePersonalInfo(userId: UserId, updatePersonalInfo: Partial<Profile>) {
  return await database.update(profiles).set(updatePersonalInfo).where(eq(profiles.userId, userId));
}

export async function createPersonalInfo(
  userId: UserId,
  firstName: string,
  lastName: string,
  phoneNumber: string,
) {
  return await database
    .insert(profiles)
    .values({
      userId,
      firstName,
      lastName,
      phoneNumber,
    })
    .returning()
    .then((rows) => rows[0]);
}
