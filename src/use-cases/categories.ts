import {
  createCategory,
  deleteCategory,
  getCategories,
  toggleCategoryStatus,
  updateCategory,
} from '@/data-access/categories';
import { Category } from '@/db/schema/categories';

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

export async function updateCategoryUseCase(
  id: number,
  name: string,
  slug: string,
  description?: string,
) {
  const updatedCategory = await updateCategory(id, { name, slug, description });
	return updateCategory;
}

export async function deleteCategoryUseCase(id: number) {
  await deleteCategory(id);
}
