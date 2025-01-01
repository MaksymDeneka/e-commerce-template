'use client';

import * as React from 'react';
import { GalleryVerticalEnd, Heart, Inbox, Truck, User } from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const data = {
  navMain: [
    {
      title: 'Personal information',
      url: '/account/profile',
      icon: User,
    },
    {
      title: 'Orders',
      url: '/account/orders',
      icon: Truck,
    },
    {
      title: 'Wishlist',
      url: '#',
      icon: Heart,
    },
    {
      title: 'Inbox',
      url: '#',
      icon: Inbox,
      badge: '10',
    },
  ],
};

export function DashboardSideBar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar variant="floating" className="" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/account">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="leading-none">
                  <span className="font-semibold text-lg">Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname == item.url}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarHeader>
    </Sidebar>
  );
}
