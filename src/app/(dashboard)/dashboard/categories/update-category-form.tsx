import { z } from 'zod';
import { UpdateCategoryInfoSchema } from './validation';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteCategoryAction, updateCategoryInfoAction } from './actions';
import { useServerAction } from 'zsa-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LoaderButton } from '@/components/loader-button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Category } from '@/db/schema/categories';
import { PencilIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type UpdateCategoryInfoFormValues = z.infer<typeof UpdateCategoryInfoSchema>;

interface EditCategoryFormProps {
  category: Category;
}

export function EditCategoryForm({ category }: EditCategoryFormProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<UpdateCategoryInfoFormValues>({
    resolver: zodResolver(UpdateCategoryInfoSchema),
    defaultValues: {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description ?? undefined,
    },
  });

  const { execute: updateCategory, isPending: isUpdating } = useServerAction(
    updateCategoryInfoAction,
    {
      onSuccess: () => {
        toast({ title: 'Category info updated' });
        setOpen(false);
      },
      onError: ({ err }) => {
        toast({ title: 'Error', description: err.message, variant: 'destructive' });
      },
    },
  );
  const { execute: deleteCategory, isPending: isDeleting } = useServerAction(deleteCategoryAction, {
    onSuccess: () => {
      toast({ title: 'Category deleted' });
      setOpen(false);
    },
    onError: ({ err }) => {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="absolute top-3 right-3 flex items-center justify-center w-7 h-7 bg-gray-100 rounded-full">
          <PencilIcon className="w-4 h-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-96">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              updateCategory(values).then(() => {});
            })}
            className="space-y-4">
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
            <div>
              <LoaderButton type="submit" isLoading={isUpdating} className="w-full mb-10">
                Save changes
              </LoaderButton>
              <Separator />
              <div className="flex justify-center rounded-lg border border-red-500 p-2 mt-10">
                <LoaderButton
                  variant="destructive"
                  onClick={() => {
                    deleteCategory({ categoryId: category.id });
                  }}
                  isLoading={isDeleting}
                  type="button"
                  className="w-full">
                  Delete category
                </LoaderButton>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
