import Link from "next/link";

import { getPublishedCategories } from "@/hooks/categories";
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

import { CartModal } from "@/components/cart/cart-modal";
import { Button } from "@/components/ui/button";
import { HomeIcon, LogInIcon } from "lucide-react";
import { HeaderLinks } from "./header-links";
import { MobileMenu } from "./mobile-menu";
import { UserNav } from "./user-nav";

export async function Header() {
  const categories = await getPublishedCategories();

  return (
    <header className="sticky top-0 left-0 z-10 bg-white border-b">
      <div className="flex items-center gap-2 px-6 py-3 max-w-screen-xl mx-auto">
        <div className="md:hidden">
          <MobileMenu categories={categories} />
        </div>

        <Link href="/">
          <Button variant="ghost" size="icon">
            <HomeIcon className="size-4" />
          </Button>
        </Link>

        <div className="hidden md:block">
          <HeaderLinks categories={categories} />
        </div>

        <div className="ml-auto flex items-center gap-4">
          {/* Cart */}
          <CartModal />

          {/* User Infos */}
          <ClerkLoading>
            <div className="size-8 rounded-full bg-muted animate-pulse" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="icon">
                  <LogInIcon className="size-4" />
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserNav />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
