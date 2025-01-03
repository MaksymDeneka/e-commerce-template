'use client';

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { createCategoryAction } from './actions';
import { Button } from '@/components/ui/button';

const CreateCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  isActive: z.boolean(),
});

type CreateCategoryFormValues = z.infer<typeof CreateCategorySchema>;

export function CreateCategoryForm() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      isActive: false,
    },
  });

  const { execute: createCategory, isPending } = useServerAction(createCategoryAction, {
    onSuccess: () => {
      toast({
        title: 'Category created',
        description: 'New category has been successfully created.',
      });
      router.refresh();
      setOpen(false);
    },
    onError: ({ err }) => {
      toast({
        title: 'Error',
        description: err.message || 'There was a problem creating category. Please try again.',
      });
    },
  });

  const onSubmit: SubmitHandler<CreateCategoryFormValues> = async (values) => {
    await createCategory(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="relative focus:outline-none">
        {/* Create category */}
        <Button>Create category</Button>
      </DialogTrigger>
      <DialogContent className="max-w-96">
        <DialogHeader>
          <DialogTitle className="text-2xl">Fill category info</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Category name</FormLabel>
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
                <FormItem className="flex-1">
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                <FormItem className="flex-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter category description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Activate</FormLabel>
                    <FormDescription>Make this category visible.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <LoaderButton isLoading={isPending}>Create category</LoaderButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
