import { database } from '@/db';
import { categories } from '@/db/schema';
import { Category } from '@/db/schema/categories';
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
  // await new Promise(resolve => setTimeout(resolve, 2000))
  return await database.select().from(categories).orderBy(categories.name);
}

export async function toggleCategoryStatus(id: number, isActive: boolean) {
  await database
    .update(categories)
    .set({ isActive: isActive, updatedAt: new Date() })
    .where(eq(categories.id, id));
}

export async function updateCategory(id: number, data: Partial<Category>) {
  const updatedCategory = await database
    .update(categories)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(categories.id, id))
    .returning();
  return updatedCategory[0];
}

export async function deleteCategory(id: number) {
  await database.delete(categories).where(eq(categories.id, id));
}
