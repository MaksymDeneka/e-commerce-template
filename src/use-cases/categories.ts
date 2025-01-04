import { createCategory, deleteCategory, getCategories, toggleCategoryStatus, updateCategory } from '@/data-access/categories';

export async function createCategoryUseCase(newCategory: {
  name: string;
  slug: string;
  isActive: boolean;
  description?: string;
}) {
  await createCategory({ ...newCategory });
}

export async function getCategoriesUseCase() {
  const categories = await getCategories();
  return categories;
}

export async function toggleCategoryStatusUseCase(id: number, isActive: boolean) {
  await toggleCategoryStatus(id, isActive);
}

export async function updateCategoryInfoUseCase(
  categoryId: number,
  updatedCategory: {
    name: string;
    slug: string;
    description?: string;
  },
) {
  await updateCategory(categoryId, { ...updatedCategory });
}

export async function deleteCategoryUseCase(categoryId: number) {
	await deleteCategory(categoryId);
}
