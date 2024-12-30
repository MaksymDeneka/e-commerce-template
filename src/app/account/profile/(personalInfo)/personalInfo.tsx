import { getPersonalInfoUseCase } from '@/use-cases/users';
import { PersonalInfoForm } from './personalInfo-form';
import { getCurrentUser } from '@/lib/session';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function PerosnalInfo() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Personal info</h1>
      <Suspense fallback={<Skeleton className="h-[300px] w-[280px] rounded" />}>
        <div className="flex gap-x-2 p-6 items-start justify-between bg-gray-50 min-h-32 min-w-60 max-w-96">
          <PerosnalInfoPreview />
          <PerosnalInfoWrapper />
        </div>
      </Suspense>
    </div>
  );
}

async function PerosnalInfoPreview() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const profile = await getPersonalInfoUseCase(user.id);
  return (
    <div className="flex flex-col gap-4 text-xl">
      <p>{profile.firstName ?? ''}</p>
      <p>{profile.lastName ?? ''}</p>
      <p>{profile.phoneNumber ?? ''}</p>
    </div>
  );
}

async function PerosnalInfoWrapper() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const profile = await getPersonalInfoUseCase(user.id);
  return (
    <PersonalInfoForm
      firstName={profile.firstName ?? ''}
      lastName={profile.lastName ?? ''}
      phoneNumber={profile.phoneNumber ?? ''}
    />
  );
}
