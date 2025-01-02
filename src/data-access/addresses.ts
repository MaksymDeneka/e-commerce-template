import { database } from '@/db';
import { Address, addresses } from '@/db/schema/addresses';
import { UserId } from '@/use-cases/types';
import { eq } from 'drizzle-orm';

export async function getAddress(userId: UserId) {
  return await database
    .select()
    .from(addresses)
    .where(eq(addresses.userId, userId))
    .then((rows) => rows[0] || '');
}

export async function updateAddress(userId: UserId, updateAddress: Partial<Address>) {
  return await database
    .update(addresses)
    .set(updateAddress)
    .where(eq(addresses.userId, userId));
}

export async function createAddress(
  userId: UserId,
  streetAddress: string,
  apartment: string,
  city: string,
  postalCode: string,
) {
  return await database
    .insert(addresses)
    .values({
      userId,
      streetAddress,
      apartment,
      city,
      postalCode,
    })
    .returning()
    .then((rows) => rows[0]);
}
