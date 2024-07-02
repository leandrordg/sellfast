import Image from "next/image";
import Link from "next/link";

import { checkRole } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BoltIcon,
  BoxIcon,
  LogOutIcon,
  ShieldIcon,
  UserRoundIcon,
} from "lucide-react";

export async function UserNav() {
  const user = await currentUser();

  const isAdmin = user && (checkRole("owner") || checkRole("admin"));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 shadow-none hover:bg-transparent"
        >
          <Image
            src={user?.imageUrl!}
            alt={user?.firstName!}
            className="rounded-full size-8"
            width={64}
            height={64}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={10}
        className="w-56 ml-6 md:ml-0"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none line-clamp-1">
              {user?.fullName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {
                user?.emailAddresses.find(
                  (email) => email.id === user?.primaryEmailAddressId
                )?.emailAddress
              }
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account">
              Meus dados
              <DropdownMenuShortcut>
                <UserRoundIcon className="size-4" />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/orders">
              Meus pedidos
              <DropdownMenuShortcut>
                <BoxIcon className="size-4" />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/settings">
              Configurações
              <DropdownMenuShortcut>
                <BoltIcon className="size-4" />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/support">Suporte</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin">
                Administrador
                <DropdownMenuShortcut>
                  <ShieldIcon className="size-4" />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full" asChild>
          <SignOutButton>
            <Button>
              Desconectar
              <DropdownMenuShortcut>
                <LogOutIcon className="size-4" />
              </DropdownMenuShortcut>
            </Button>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
