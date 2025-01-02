'use client';

// import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useServerAction } from 'zsa-react';
import { LoaderButton } from '@/components/loader-button';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be a positive number'),
  compareAtPrice: z.number().min(0, 'Compare at price must be a positive number').optional(),
  quantity: z.number().int().min(0, 'Quantity must be a non-negative integer'),
  categoryId: z.number().int().positive('Category is required'),
  isPublished: z.boolean(),
  // metadata: z.record(z.string(), z.any()).optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export function CreateProductForm() {
  // const router = useRouter();

  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      price: 0,
      compareAtPrice: undefined,
      quantity: 0,
      categoryId: 1, // Default category ID
      isPublished: false,
      // metadata: {},
    },
  });

  const { execute: createProduct, isPending } = useServerAction(createProductAction, {
    onSuccess: () => {
      toast({
        title: 'Product created',
        description: 'Your new product has been successfully created.',
      });
    },
    onError: ({ err }) => {
      toast({
        title: 'Error',
        description: err.message || 'There was a problem creating your product. Please try again.',
      });
    },
  });

  // async function onSubmit(data: ProductFormValues) {
  //   setIsLoading(true);

  //   try {
  //     const response = await fetch('/api/products', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to create product');
  //     }

  //     toast({
  //       title: 'Product created',
  //       description: 'Your new product has been successfully created.',
  //     });

  //     router.push('/admin/products');
  //   } catch (error) {
  //     console.error('Error creating product:', error);
  //     toast({
  //       title: 'Error',
  //       description: 'There was a problem creating your product. Please try again.',
  //       variant: 'destructive',
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  const onSubmit: SubmitHandler<z.infer<typeof productSchema>> = async (values) => {
    await createProduct(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="product-slug" {...field} />
              </FormControl>
              <FormDescription>
                This is the URL-friendly version of the name. It's usually all lowercase and
                contains only letters, numbers, and hyphens.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="compareAtPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compare at Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  onChange={(e) =>
                    field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)
                  }
                />
              </FormControl>
              <FormDescription>
                Original price for comparison, if this product is on sale.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* TODO: Fetch categories from API and map them here */}
                  <SelectItem value="1">Category 1</SelectItem>
                  <SelectItem value="2">Category 2</SelectItem>
                  <SelectItem value="3">Category 3</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Publish</FormLabel>
                <FormDescription>Make this product visible.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <LoaderButton isLoading={isPending}>Create Product</LoaderButton>
      </form>
    </Form>
  );
}
