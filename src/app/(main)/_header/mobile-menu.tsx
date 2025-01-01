'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function MobileMenu() {
  const isMobile = useIsMobile();
  return isMobile ? (
    <Drawer direction="top">
      <DrawerTrigger>
        <Menu className="w-8 h-8" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerDescription></DrawerDescription>
        <DrawerClose>
          <X className="absolute top-5 right-5 w-8 h-8" />
        </DrawerClose>
        <DrawerHeader className="text-start pt-5">
          <DrawerTitle className="text-2xl">Categories</DrawerTitle>
        </DrawerHeader>
        <nav className="flex flex-col gap-y-8 p-4 text-4xl">
          <Link href="/">Categorie</Link>
          <Link href="/">Categorie</Link>
          <Link href="/">Categorie</Link>
        </nav>
      </DrawerContent>
    </Drawer>
  ) : null;
}
