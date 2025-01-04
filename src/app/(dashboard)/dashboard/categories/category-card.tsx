'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

import { Category } from '@/db/schema/categories';
import { useToast } from '@/hooks/use-toast';
import { toggleCategoryStatusAction } from './actions';
import { EditCategoryForm } from './update-category-form';

export function CategoryCard({ category }: { category: Category }) {
  const [isActive, setIsActive] = useState(category.isActive);
  const { toast } = useToast();

  const handleToggle = async () => {
    const newStatus = !isActive;
    try {
      setIsActive(newStatus);
      await toggleCategoryStatusAction({ id: category.id, isActive: newStatus });
      toast({
        title: 'Category status updated',
        description: `${category.name} is now ${newStatus ? 'active' : 'inactive'}.`,
      });
    } catch (error) {
      console.error('Failed to update category status:', error);
      setIsActive(!newStatus);
      toast({
        title: 'Error',
        description: 'Failed to update category status. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <form action={handleToggle}>
            <div className="flex items-center space-x-2">
              <Switch
                id={`category-${category.id}`}
                checked={isActive}
                onCheckedChange={handleToggle}
              />
              <label htmlFor={`category-${category.id}`}>{isActive ? 'Active' : 'Inactive'}</label>
            </div>
          </form>
          <EditCategoryForm category={category} />
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoryCardSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="h-6 w-11 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
