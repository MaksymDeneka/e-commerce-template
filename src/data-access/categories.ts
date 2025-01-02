import { database } from '@/db';
import { categories } from '@/db/schema';

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
  return await database.select().from(categories);
}
