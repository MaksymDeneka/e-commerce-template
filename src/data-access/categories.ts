import { database } from '@/db';
import { categories } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function createCategory(
  name: string,
  slug: string,
  isActive: boolean,
  description?: string,
) {
  return await database
    .insert(categories)
    .values({
      name,
      slug,
      description,
      isActive,
    })
    .returning()
    .then((rows) => rows[0]);
}

export async function getCategories() {
  return await database.select().from(categories).orderBy(categories.name);
}

export async function toggleCategoryStatus(id: number, isActive: boolean) {
  await database
    .update(categories)
    .set({ isActive: isActive, updatedAt: new Date() })
    .where(eq(categories.id, id));
}
