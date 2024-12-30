import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { getCurrentUser } from '@/lib/session';
import { Settings2Icon, Truck, User, User2 } from 'lucide-react';
import { SignOutItem } from './sign-out-item';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import MobileMenu from './mobile-menu';

export default function Navigation() {
  return (
    <header className="sticky top-0 bg-white flex justify-center items-center py-3 px-5 z-50">
      <div className="flex justify-between items-center max-w-screen-2xl w-full">
        <Link href="/">
          <Image src="/images/logo.png" width={50} height={50} priority alt="logo" />
        </Link>
        <nav className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Category One</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-3 w-80">
                    <NavigationMenuLink href="/">item1</NavigationMenuLink>
                    <NavigationMenuLink href="/">item1</NavigationMenuLink>
                    <NavigationMenuLink href="/">item1</NavigationMenuLink>
                    <NavigationMenuLink href="/">item1</NavigationMenuLink>
                    <NavigationMenuLink href="/">item1</NavigationMenuLink>
                    <NavigationMenuLink href="/">item1</NavigationMenuLink>
                    <NavigationMenuLink href="/">item1</NavigationMenuLink>
                  </div>
                  <Image
                    src="/images/category-drop-down.svg"
                    alt="category-drop-down"
                    width={100}
                    height={100}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Category Two</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-3 w-80">
                    <NavigationMenuLink href="/">item2</NavigationMenuLink>
                    <NavigationMenuLink href="/">item2</NavigationMenuLink>
                    <NavigationMenuLink href="/">item2</NavigationMenuLink>
                    <NavigationMenuLink href="/">item2</NavigationMenuLink>
                    <NavigationMenuLink href="/">item2</NavigationMenuLink>
                    <NavigationMenuLink href="/">item2</NavigationMenuLink>
                    <NavigationMenuLink href="/">item2</NavigationMenuLink>
                  </div>
                  <Image
                    src="/images/category-drop-down.svg"
                    alt="category-drop-down"
                    width={100}
                    height={100}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Category Three</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-3 w-80">
                    <NavigationMenuLink href="/">item3</NavigationMenuLink>
                    <NavigationMenuLink href="/">item3</NavigationMenuLink>
                    <NavigationMenuLink href="/">item3</NavigationMenuLink>
                    <NavigationMenuLink href="/">item3</NavigationMenuLink>
                    <NavigationMenuLink href="/">item3</NavigationMenuLink>
                    <NavigationMenuLink href="/">item3</NavigationMenuLink>
                    <NavigationMenuLink href="/">item3</NavigationMenuLink>
                  </div>
                  <Image
                    src="/images/category-drop-down.svg"
                    alt="category-drop-down"
                    width={100}
                    height={100}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex gap-x-5">
          <Link href="/account">
            <AccountIcon size="small" />
          </Link>
          <MobileMenu />
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}

function AccountIcon({ size }: { size?: string }) {
  return <User2 className={`${size == 'small' ? 'md:hidden' : ''} w-8 h-8`} />;
}

async function HeaderActions() {
  const user = await getCurrentUser();
  const isSignedIn = !!user;

  return (
    <>
      {isSignedIn ? (
        <div className="hidden md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <AccountIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-5">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex">
                    <User />
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex">
                    <Truck />
                    Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex">
                    <Settings2Icon /> Settings
                  </Link>
                </DropdownMenuItem>

                <SignOutItem />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </>
      )}
    </>
  );
}
