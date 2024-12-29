import { database } from '@/db';
import { Profile, profiles } from '@/db/schema';
import { UserId } from '@/use-cases/types';
import { eq } from 'drizzle-orm';

// export async function updateProfile(userId: UserId, updateProfile: Partial<Profile>) {
//   await database.update(profiles).set(updateProfile).where(eq(profiles.userId, userId));
// }

// export async function createProfile(
//   userId: UserId,
//   firstName: string,
//   lastName: string,
//   phoneNumber: string,
// ) {
//   const [profile] = await database
//     .insert(profiles)
//     .values({
//       userId,
//       firstName,
//       lastName,
//       phoneNumber,
//     })
//     .onConflictDoNothing()
//     .returning();
//   return profile;
// }

// export async function getProfile(userId: UserId) {
//   const profile = await database.query.profiles.findFirst({
//     where: eq(profiles.userId, userId),
//   });

//   return profile;
// }


export async function getProfile(userId: UserId) {
  return await database
    .select()
    .from(profiles)
    .where(eq(profiles.userId, userId))
    .then((rows) => rows[0] || null);
}

export async function updateProfile(userId: UserId, updateProfile: Partial<Profile>) {
  return await database
    .update(profiles)
    .set(updateProfile)
    .where(eq(profiles.userId, userId))
    .returning();
}

export async function createProfile(
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