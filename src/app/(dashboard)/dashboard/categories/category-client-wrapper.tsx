'use client'

import { Category } from '@/db/schema/categories'
import { useState } from 'react'
import { CategoryCard } from './category-card'
import { EditCategoryDialog } from './edit-category-dialog'

interface ClientWrapperProps {
  initialCategories: Category[]
}

export function ClientWrapper({ initialCategories }: ClientWrapperProps) {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [categoriesData, setCategoriesData] = useState<Category[]>(initialCategories)

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
  }

  const handleClose = () => {
    setEditingCategory(null)
  }

  const handleUpdate = (updatedCategory: Category) => {
    setCategoriesData(prevCategories =>
      prevCategories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat)
    )
  }

  const handleDelete = (deletedCategoryId: number) => {
    setCategoriesData(prevCategories =>
      prevCategories.filter(cat => cat.id !== deletedCategoryId)
    )
  }

  return (
    <>
      {categoriesData.map(category => (
        <CategoryCard key={category.id} category={category} onEdit={() => handleEdit(category)} />
      ))}
      <EditCategoryDialog
        category={editingCategory}
        isOpen={!!editingCategory}
        onClose={handleClose}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </>
  )
}

