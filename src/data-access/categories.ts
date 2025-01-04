import { database } from '@/db';
import { categories } from '@/db/schema';
import { Category, NewCategory } from '@/db/schema/categories';
import { eq } from 'drizzle-orm';

export async function createCategory(category: NewCategory) {
  await database.insert(categories).values(category);
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

export async function updateCategory(categoryId: number, updatedCategory: Partial<Category>) {
  await database
    .update(categories)
    .set({ ...updatedCategory, updatedAt: new Date() })
    .where(eq(categories.id, categoryId));
}

export async function deleteCategory(categoryId: number) {
  await database.delete(categories).where(eq(categories.id, categoryId));
}
