'use client';

import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useServerAction } from 'zsa-react';
import { updateAddressAction } from '../actions';
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

const updateAddressSchema = z.object({
  streetAddress: z.string().min(1),
  apartment: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
});

type ProfileUpdate = z.infer<typeof updateAddressSchema>;

export function AddressForm(props: ProfileUpdate) {
  const { streetAddress, apartment, city, postalCode } = props;
  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const form = useForm<ProfileUpdate>({
    resolver: zodResolver(updateAddressSchema),
    defaultValues: {
      streetAddress: streetAddress,
      apartment: apartment,
      city: city,
      postalCode: postalCode,
    },
  });

  const { execute: updateAddress, isPending } = useServerAction(updateAddressAction, {
    onSuccess: () => {
      toast({
        title: 'Address Updated',
        description: 'Address updated successfully.',
      });
      router.refresh();
      setOpen(false);
    },
    onError: ({ err }) => {
      toast({
        title: 'Error',
        description: err.message || 'Failed to update Address.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof updateAddressSchema>> = async (values) => {
    await updateAddress(values);
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
              name="streetAddress"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apartment"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Apartment</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Postal code</FormLabel>
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
