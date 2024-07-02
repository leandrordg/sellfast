import Link from "next/link";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";
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
import { MenuIcon } from "lucide-react";
import { UserNav } from "./user-nav";

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
      <SheetContent side="left" className="h-dvh flex flex-col p-0">
        <SheetHeader className="pt-6 px-6">
          <SheetClose asChild>
            <Link href="/" className="w-fit">
              <SheetTitle>Sellfast</SheetTitle>
            </Link>
          </SheetClose>
          <SheetDescription>
            Explore nossas categorias e encontre o que procura.
          </SheetDescription>
        </SheetHeader>

        <ul className="grow flex flex-col gap-2 my-4 overflow-y-auto">
          <span className="px-6 text-sm text-muted-foreground">Categorias</span>
          {categories.map((category) => (
            <MobileMenuLink
              key={category.id}
              href={`/categories/${category.slug}`}
              title={category.name}
            />
          ))}

          <span className="px-6 text-sm text-muted-foreground">Produtos</span>
          <MobileMenuLink href="/products" title="Em alta">
            Confira os produtos mais vendidos.
          </MobileMenuLink>
          <MobileMenuLink href="/products" title="Novidades">
            Conheça os lançamentos da temporada.
          </MobileMenuLink>

          <span className="px-6 pt-2 text-sm text-muted-foreground mt-auto">
            Utilitários
          </span>
          <MobileMenuLink href="/about" title="Sobre nós" />
          <MobileMenuLink href="/contact" title="Contato" />
        </ul>

        <SheetFooter className="flex items-start justify-start px-6 pb-6">
          <UserNav />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const MobileMenuLink = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <SheetClose asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none px-6 py-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            children && "space-y-1",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </SheetClose>
    </li>
  );
});
MobileMenuLink.displayName = "MobileMenuLink";
