import { getCategoriesUseCase } from '@/use-cases/categories';
import { CreateCategoryForm } from './create-category-form';
import { Category } from '@/db/schema/categories';
import { Suspense } from 'react';

export default function Categories() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <div className="mb-8">
        <ul>
          <Suspense fallback={<div>Loading...</div>}>
            <CategoriesPreview />
          </Suspense>
        </ul>
      </div>
      <CreateCategoryForm />
    </div>
  );
}

async function CategoriesPreview() {
  const categories = await getCategoriesUseCase();
  return (
    <>
      {categories.map((category: Category) => (
        <li key={category.id}>{category.name}</li>
      ))}
    </>
  );
}
