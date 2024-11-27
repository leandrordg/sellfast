import Link from "next/link";

import { CategoryType } from "@/types/globals";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { MobileLinks } from "./mobile-links";

type Props = {
  categories: CategoryType[];
};

export function MobileMenu({ categories }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col overflow-y-auto divide-y h-full"
      >
        <SheetHeader className="px-6">
          <SheetClose asChild>
            <Link href="/" className="w-fit">
              <SheetTitle>Sellfast</SheetTitle>
            </Link>
          </SheetClose>
          <SheetDescription>
            Busque por categorias, produtos e muito mais.
          </SheetDescription>
        </SheetHeader>

        <MobileLinks categories={categories} />

        <SheetFooter className="flex mt-auto px-6">
          <ClerkLoading>
            <div className="size-8 rounded-full bg-muted animate-pulse" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignInButton mode="redirect">
                <SheetClose asChild>
                  <Button variant="outline" className="w-full">
                    Fazer login ou criar conta
                    <LogInIcon className="size-4 ml-2" />
                  </Button>
                </SheetClose>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <SignOutButton>
                <SheetClose asChild>
                  <Button variant="outline" className="w-full">
                    Sair da conta
                    <LogOutIcon className="size-4 ml-2" />
                  </Button>
                </SheetClose>
              </SignOutButton>
            </SignedIn>
          </ClerkLoaded>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
