'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import NProgress from 'nprogress';
import { signOutAction } from './actions';

export function SignOutItem() {
  return (
    <DropdownMenuItem
      onSelect={async () => {
        NProgress.start();
        signOutAction().then(() => {
          NProgress.done();
        });
      }}>
      <LogOut />
      Sign Out
    </DropdownMenuItem>
  );
}
