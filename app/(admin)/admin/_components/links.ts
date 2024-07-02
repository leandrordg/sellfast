import { SidebarLinkProps, SidebarLinksProps } from "@/types/globals";

import {
  BoltIcon,
  BoxIcon,
  CirclePlusIcon,
  Layers3Icon,
  LayoutDashboardIcon,
  ListOrderedIcon,
  PenLineIcon,
  Rows3Icon,
  TrashIcon,
  UsersRoundIcon,
} from "lucide-react";

const categoriesLink: SidebarLinkProps[] = [
  {
    id: 1,
    title: "Adicionar uma categoria",
    href: "/admin/categories/add",
    icon: CirclePlusIcon,
  },
  {
    id: 2,
    title: "Editar uma categoria",
    href: "/admin/categories/edit",
    icon: PenLineIcon,
  },
  {
    id: 3,
    title: "Excluir uma categoria",
    href: "/admin/categories/delete",
    icon: TrashIcon,
  },
];

const productsLink: SidebarLinkProps[] = [
  {
    id: 1,
    title: "Adicionar um produto",
    href: "/admin/products/add",
    icon: CirclePlusIcon,
  },
  {
    id: 2,
    title: "Editar um produto",
    href: "/admin/products/edit",
    icon: PenLineIcon,
  },
  {
    id: 3,
    title: "Excluir um produto",
    href: "/admin/products/delete",
    icon: TrashIcon,
  },
];

const ordersLink: SidebarLinkProps[] = [
  {
    id: 1,
    title: "Todos os pedidos",
    href: "/admin/orders",
    icon: Rows3Icon,
  },
];

const customersLink: SidebarLinkProps[] = [
  {
    id: 1,
    title: "Todos os clientes",
    href: "/admin/customers",
    icon: Rows3Icon,
  },
];

const settingsLink: SidebarLinkProps[] = [
  {
    id: 1,
    title: "Configurações gerais",
    href: "/admin/settings",
    icon: Rows3Icon,
  },
];

const routes: SidebarLinksProps[] = [
  {
    id: 1,
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboardIcon,
    subRoutes: [],
  },
  {
    id: 2,
    title: "Categorias",
    href: "/admin/categories",
    icon: Layers3Icon,
    subRoutes: categoriesLink,
  },
  {
    id: 3,
    title: "Produtos",
    href: "/admin/products",
    icon: BoxIcon,
    subRoutes: productsLink,
  },
  {
    id: 4,
    title: "Pedidos",
    href: "/admin/orders",
    icon: ListOrderedIcon,
    subRoutes: ordersLink,
  },
  {
    id: 5,
    title: "Clientes",
    href: "/admin/customers",
    icon: UsersRoundIcon,
    subRoutes: customersLink,
  },
  {
    id: 6,
    title: "Configurações",
    href: "/admin/settings",
    icon: BoltIcon,
    subRoutes: settingsLink,
  },
];

export { routes };
