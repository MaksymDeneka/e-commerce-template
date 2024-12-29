'use client';

import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { updateProfileAction } from './actions';
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


const updateProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().min(1),
});

type ProfileUpdate = z.infer<typeof updateProfileSchema>;

export function ProfileForm(props: ProfileUpdate) {
  const { firstName, lastName, phoneNumber } = props;
  const { toast } = useToast();
	const router = useRouter()

  const form = useForm<ProfileUpdate>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
    },
  });

  const { execute: updateProfile, isPending } = useServerAction(updateProfileAction, {
    onSuccess: () => {
      toast({
        title: 'Info Updated',
        description: 'Info updated successfully.',
      });
      router.refresh()
    },
    onError: ({ err }) => {
      toast({
        title: 'Error',
        description: err.message || 'Failed to update personal information.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof updateProfileSchema>> = async (values) => {
    await updateProfile(values);
  };

  return (
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
  );
}
