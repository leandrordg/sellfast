import Link from "next/link";

import { CustomBreadcrumb } from "@/components/custom-breadcrumb";
import { Button } from "@/components/ui/button";
import {
  BoltIcon,
  BoxIcon,
  Layers3Icon,
  ListOrderedIcon,
  UsersIcon,
} from "lucide-react";

const links = [
  {
    id: 1,
    icon: Layers3Icon,
    title: "Categorias",
    description: "Gerencie todas as categorias",
    href: "/admin/categories",
  },
  {
    id: 2,
    icon: BoxIcon,
    title: "Produtos",
    description: "Veja todos os produtos cadastrados",
    href: "/admin/products",
  },
  {
    id: 3,
    icon: ListOrderedIcon,
    title: "Pedidos",
    description: "Administre todos os pedidos",
    href: "/admin/orders",
  },
  {
    id: 4,
    icon: UsersIcon,
    title: "Clientes",
    description: "Veja todos os clientes cadastrados",
    href: "/admin/customers",
  },
  {
    id: 5,
    icon: BoltIcon,
    title: "Configurações",
    description: "Todas as configurações do sistema",
    href: "/admin/settings",
  },
];

export default function Page() {
  return (
    <div className="h-full py-6 lg:py-10 rounded-lg space-y-6 max-w-screen-xl mx-auto">
      <CustomBreadcrumb />

      <h1 className="text-xl font-semibold">Painél de Administração</h1>

      <p className="text-sm text-muted-foreground">
        Bem-vindo ao painel de administração. Aqui você pode gerenciar todos os
        aspectos do seu negócio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {links.map((link) => {
          const { id, icon: Icon, title, description, href } = link;

          return (
            <Link key={id} href={href}>
              <div className="flex flex-col h-full items-start gap-4 border rounded-lg p-6 hover:bg-muted/50">
                <Icon className="size-6 text-muted-foreground" />
                <div className="grow">
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {description}
                  </p>
                </div>
                <Button variant="link" className="p-0 hover:no-underline">
                  Ir para {title.toLowerCase()}
                </Button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
