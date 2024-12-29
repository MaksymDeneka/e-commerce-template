import { getProfileUseCase } from '@/use-cases/users';
import { ProfileForm } from './profile-form';
import { getCurrentUser } from '@/lib/session';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Profile() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Personal info</h1>
      <Suspense fallback={<Skeleton className="h-[300px] w-[280px] rounded" />}>
        <ProfileWrapper />
      </Suspense>
    </div>
  );
}

async function ProfileWrapper() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const profile = await getProfileUseCase(user.id);
  return (
    <ProfileForm
      firstName={profile.firstName ?? ''}
      lastName={profile.lastName ?? ''}
      phoneNumber={profile.phoneNumber ?? ''}
    />
  );
}
