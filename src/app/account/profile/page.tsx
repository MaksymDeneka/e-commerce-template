import { getProfileUseCase } from '@/use-cases/users';
import { ProfileForm } from './profile-form';
import { getCurrentUser } from '@/lib/session';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Profile() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Personal info</h1>
      <Suspense fallback={<Skeleton className="h-[300px] w-[280px] rounded" />}>
        <div className="flex gap-x-2 items-start">
          <ProfilePreview />
          <ProfileWrapper />
        </div>
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

async function ProfilePreview() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const profile = await getProfileUseCase(user.id);
  return (
    <div className="flex flex-col gap-4 max-w-80 *:outline *:outline-2 *:outline-slate-400 [&>p]:p-1">
      <p>{profile.firstName ?? ''}</p>
      <p>{profile.lastName ?? ''}</p>
      <p>{profile.phoneNumber ?? ''}</p>
    </div>
  );
}
