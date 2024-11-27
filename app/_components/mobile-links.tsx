"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";

import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/types/globals";
import { routes } from "../(admin)/admin/_components/links";

type Props = {
  categories: CategoryType[];
};

export function MobileLinks({ categories }: Props) {
  const pathname = usePathname();

  const isAdminPath = pathname.startsWith("/admin");

  if (!isAdminPath)
    return (
      <ul className="flex flex-col gap-2 py-6">
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

        <span className="px-6 text-sm text-muted-foreground">Utilitários</span>
        <MobileMenuLink href="/about" title="Sobre nós" />
        <MobileMenuLink href="/contact" title="Contato" />
      </ul>
    );

  return (
    <ul className="flex flex-col gap-2 py-6">
      <span className="px-6 text-sm text-muted-foreground">Administrador</span>
      {routes.map((route) => (
        <MobileMenuLink key={route.id} href={route.href} title={route.title} />
      ))}
    </ul>
  );
}

export const MobileMenuLink = forwardRef<
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
