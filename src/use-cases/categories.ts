import { createCategory, getCategories, toggleCategoryStatus } from '@/data-access/categories';

export async function createCategoryUseCase(
  name: string,
  slug: string,
  isActive: boolean,
  description?: string,
) {
  await createCategory(name, slug, isActive, description);
}

export async function getCategoriesUseCase() {
  const categories = await getCategories();
  return categories;
}

export async function toggleCategoryStatusUseCase(id: number, isActive: boolean) {
  await toggleCategoryStatus(id, isActive);
}
