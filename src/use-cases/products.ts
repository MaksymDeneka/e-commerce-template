import { createProduct } from '@/data-access/products';

export async function createProductUseCase(newProduct: {
  name: string;
  slug: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  categoryId: number;
  isPublished: boolean;
}) {
  await createProduct({ ...newProduct });
}
