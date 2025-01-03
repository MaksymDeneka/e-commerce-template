'use client';

import { getCategoriesUseCase } from '@/use-cases/categories';
import { CreateCategoryForm } from './create-category-form';
import { Suspense, useState } from 'react';
import { CategoryCard, CategoryCardSkeleton } from './category-card';
import { Category } from '@/db/schema/categories';
import { EditCategoryDialog } from './edit-category-dialog';

export default function Categories() {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Categories</h1>
        <CreateCategoryForm />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense fallback={<CategoryCardSkeleton />}>
          <CategoryList onEdit={(category) => setEditingCategory(category)} />
        </Suspense>
      </div>
      <EditCategoryDialog
        category={editingCategory}
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
      />
    </div>
  );
}

async function CategoryList({ onEdit }: { onEdit: (category: Category) => void }) {
  const categories = await getCategoriesUseCase();

  return categories.map((category) => (
    <CategoryCard category={category} onEdit={() => onEdit(category)} />
  ));
}
