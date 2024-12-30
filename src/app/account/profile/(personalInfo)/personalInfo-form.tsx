'use client';

import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { updatePersonalInfoAction } from '../actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderButton } from '@/components/loader-button';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { PencilIcon } from 'lucide-react';

const updatePersonalInfoSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().min(1),
});

type PersonalInfoUpdate = z.infer<typeof updatePersonalInfoSchema>;

export function PersonalInfoForm(props: PersonalInfoUpdate) {
  const { firstName, lastName, phoneNumber } = props;
  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const form = useForm<PersonalInfoUpdate>({
    resolver: zodResolver(updatePersonalInfoSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
    },
  });

  const { execute: updatePersonalInfo, isPending } = useServerAction(updatePersonalInfoAction, {
    onSuccess: () => {
      toast({
        title: 'Info Updated',
        description: 'Info updated successfully.',
      });
      router.refresh();
      setOpen(false);
    },
    onError: ({ err }) => {
      toast({
        title: 'Error',
        description: err.message || 'Failed to update personal information.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof updatePersonalInfoSchema>> = async (values) => {
    await updatePersonalInfo(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="relative focus:outline-none">
        <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-white rounded-full">
          <PencilIcon className="w-4 h-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-80">
        <DialogHeader>
          <DialogTitle>Fill in your info</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 flex flex-col gap-2 max-w-72">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoaderButton isLoading={isPending}>Save</LoaderButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
