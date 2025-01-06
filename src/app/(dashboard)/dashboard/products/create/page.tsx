import { getCategoriesUseCase } from '@/use-cases/categories';
import { CreateProductForm } from './create-product-form';

export default async function CreateProductPage() {
  const categories = await getCategoriesUseCase();
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Create New Product</h1>
      <CreateProductForm categories={categories} />
    </div>
  );
}
