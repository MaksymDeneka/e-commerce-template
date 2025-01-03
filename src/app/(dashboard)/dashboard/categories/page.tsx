import { getCategoriesUseCase } from '@/use-cases/categories';
import { CreateCategoryForm } from './create-category-form';
import { Suspense } from 'react';
import { CategoryCard, CategoryCardSkeleton } from './category-card';

export default function Categories() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Categories</h1>
        <CreateCategoryForm />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense fallback={<CategoryCardSkeleton />}>
          <CategoryList />
        </Suspense>
      </div>
    </div>
  );
}

async function CategoryList() {
  const categories = await getCategoriesUseCase();

  return categories.map((category) => <CategoryCard category={category} />);
}
