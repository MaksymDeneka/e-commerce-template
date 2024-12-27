import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
} from '@/components/ui/navigation-menu';
import { getCurrentUser } from '@/lib/session';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Settings2Icon } from 'lucide-react';
import { SignOutItem } from './sign-out-item';

export default function Navigation() {
  return (
    <header className="flex justify-center items-center py-3 px-5">
      <div className="flex justify-between items-center max-w-screen-2xl w-full">
        <Link href="/">
          <Image src="/images/logo.png" width={50} height={50} priority alt="logo" />
        </Link>
        <nav>
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
        <div>
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}

async function ProfileAvatar() {
  // async function ProfileAvatar({ userId }: { userId: number }) {
  // const profile = await getUserProfileUseCase(userId);

  return (
    <Avatar>
      <AvatarImage src="images/icons/avatar.jpg" />
      {/* <AvatarImage src={getProfileImageFullUrl(profile)} /> */}
      {/* <AvatarFallback>
        {profile.displayName?.substring(0, 2).toUpperCase() ?? "AA"}
      </AvatarFallback> */}
    </Avatar>
  );
}

async function HeaderActions() {
  const user = await getCurrentUser();
  const isSignedIn = !!user;

  return (
    <>
      {isSignedIn ? (
        <>
          {/* <Suspense>
            <NotificationsWrapper />
          </Suspense> */}

          <DropdownMenu>
            <DropdownMenuTrigger>
              {/* <Suspense
                fallback={
                  <div className="bg-gray-800 rounded-full h-10 w-10 shrink-0 flex items-center justify-center">
                    ..
                  </div>
                }
              > */}
              <ProfileAvatar />
              {/* </Suspense> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="space-y-2">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex gap-2 items-center cursor-pointer">
                  <Settings2Icon className="w-4 h-4" /> Settings
                </Link>
              </DropdownMenuItem>
              <SignOutItem />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <div className="md:hidden">
            <MenuButton />
          </div> */}
        </>
      ) : (
        <>
          <Button asChild variant="secondary">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </>
      )}
    </>
  );
}
