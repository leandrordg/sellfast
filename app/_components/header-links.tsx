import Link from "next/link";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type Props = {
  categories: Category[];
};

export function HeaderLinks({ categories }: Props) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Utilitários</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Sellfast
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      A melhor loja online para comprar produtos de qualidade.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <HeaderLink href="/about-us" title="Sobre nós">
                Saiba mais sobre a nossa história e missão.
              </HeaderLink>
              <HeaderLink href="/certificates" title="Certificados">
                Conheça os certificados de qualidade dos nossos produtos.
              </HeaderLink>
              <HeaderLink href="/policies-and-terms" title="Políticas e Termos">
                Leia as nossas políticas e termos de uso.
              </HeaderLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {categories.length > 0 && (
          <NavigationMenuItem>
            <Link href="/categories">
              <NavigationMenuTrigger>Categorias</NavigationMenuTrigger>
            </Link>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {categories.map((category) => (
                  <HeaderLink
                    key={category.id}
                    title={category.name}
                    href={`/categories/${category.slug}`}
                  >
                    {category.description}
                  </HeaderLink>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        <NavigationMenuItem>
          <Link href="/products" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Em alta
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const HeaderLink = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
HeaderLink.displayName = "HeaderLink";
