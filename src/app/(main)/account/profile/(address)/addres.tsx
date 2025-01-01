import { getCurrentUser } from '@/lib/session';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { getAddressUseCase } from '@/use-cases/users';
import { AddressForm } from './address-form';

export default async function Address() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Address</h1>
      <Suspense fallback={<Skeleton className="h-[300px] w-[280px] rounded" />}>
        <div className="flex gap-x-2 p-6 items-start justify-between bg-gray-50 min-h-32 min-w-60 max-w-96">
          <AddressPreview />
          <PerosnalInfoWrapper />
        </div>
      </Suspense>
    </div>
  );
}

async function AddressPreview() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const address = await getAddressUseCase(user.id);
  return (
    <div className="flex flex-col gap-4 text-xl">
      <p>{address.streetAddress ?? ''}</p>
      <p>{address.apartment ?? ''}</p>
      <p>{address.city ?? ''}</p>
      <p>{address.postalCode ?? ''}</p>
    </div>
  );
}

async function PerosnalInfoWrapper() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const address = await getAddressUseCase(user.id);
  return (
    <AddressForm
      streetAddress={address.streetAddress ?? ''}
      apartment={address.apartment ?? ''}
      city={address.city ?? ''}
      postalCode={address.postalCode ?? ''}
    />
  );
}
