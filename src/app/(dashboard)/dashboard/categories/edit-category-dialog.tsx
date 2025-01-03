'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useServerAction } from 'zsa-react';
import { Category } from '@/db/schema/categories';
import { useToast } from '@/hooks/use-toast';
import { LoaderButton } from '@/components/loader-button';
import { deleteCategoryAction, updateCategoryAction } from './actions';

// type Category = typeof categories.$inferSelect

const UpdateCategorySchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
});

type UpdateCategoryFormValues = z.infer<typeof UpdateCategorySchema>;

interface EditCategoryDialogProps {
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (category: any) => void;
  //ANY type here
  onDelete: (categoryId: number) => void;
}

export function EditCategoryDialog({
  category,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}: EditCategoryDialogProps) {
  const router = useRouter();
  // const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const form = useForm<UpdateCategoryFormValues>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      id: category?.id,
      name: category?.name || '',
      slug: category?.slug || '',
      description: category?.description || '',
    },
  });

  const { execute: updateCategory, isPending } = useServerAction(updateCategoryAction, {
    onSuccess: () => {
      toast({
        title: 'Category info updated',
        description: 'Category info has been successfully updated.',
      });
      // router.refresh();
      onClose();
      // setOpen(false);
    },
    onError: ({ err }) => {
      toast({
        title: 'Error',
        description: err.message || 'There was a problem updating category. Please try again.',
      });
    },
  });
  const { execute: deleteCategory } = useServerAction(deleteCategoryAction, {
    onSuccess: () => {
      toast({
        title: 'Category deleted',
        description: 'Category has been successfully deleted.',
      });
      router.refresh();
      onClose();
    },
    onError: ({ err }) => {
      toast({
        title: 'Error',
        description: err.message || 'There was a problem deleting category. Please try again.',
      });
    },
  });

  const onSubmit: SubmitHandler<UpdateCategoryFormValues> = async (values) => {
    const updatedCategory = await updateCategory(values);
    onUpdate(updatedCategory);
  };
  const onDeleteInternal = async () => {
    if (!category) return;
    await deleteCategory({ id: category.id });
    onDelete(category.id);
  };

  // async function onSubmit(data: FormData) {
  //   if (!category) return

  //   try {
  //     await updateCategory(category.id, data)
  //     toast({ title: 'Category updated successfully' })
  //     router.refresh()
  //     onClose()
  //   } catch (error) {
  //     console.error('Failed to update category:', error)
  //     toast({ title: 'Failed to update category', variant: 'destructive' })
  //   }
  // }

  // async function onDelete() {
  //   if (!category) return;

  //   setIsDeleting(true);
  //   try {
  //     await deleteCategory(category.id);
  //     toast({ title: 'Category deleted successfully' });
  //     router.refresh();
  //     onClose();
  //   } catch (error) {
  //     console.error('Failed to delete category:', error);
  //     toast({ title: 'Failed to delete category', variant: 'destructive' });
  //   } finally {
  //     setIsDeleting(false);
  //   }
  // }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Create Category'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
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
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <LoaderButton isLoading={isPending} type="submit">
                Save changes
              </LoaderButton>
              {category && (
                <Button type="button" variant="destructive" onClick={onDeleteInternal}>
                  {/* {isPending ? 'Deleting...' : 'Delete'} */}
                  Delete
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
