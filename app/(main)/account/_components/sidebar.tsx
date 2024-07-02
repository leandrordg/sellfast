"use client";

import { SidebarLinkProps } from "@/types/globals";

import { SidebarLink } from "@/components/sidebar-link";
import {
  BoltIcon,
  BoxIcon,
  CircleHelp,
  RssIcon,
  UserRoundIcon,
} from "lucide-react";

const sidebarLinks: SidebarLinkProps[] = [
  {
    id: 1,
    title: "Meus dados",
    href: "/account",
    icon: UserRoundIcon,
  },
  {
    id: 2,
    title: "Meus pedidos",
    href: "/account/orders",
    icon: BoxIcon,
  },
  {
    id: 3,
    title: "Rastrear pedido",
    href: "/account/track-order",
    icon: RssIcon,
  },
  {
    id: 4,
    title: "Configurações",
    href: "/account/settings",
    icon: BoltIcon,
  },
  {
    id: 5,
    title: "Suporte",
    href: "/account/support",
    icon: CircleHelp,
  },
];

export function Sidebar() {
  return (
    <div className="flex flex-col gap-6 py-6 lg:py-10">
      <h1 className="text-lg font-semibold">Minha conta</h1>

      <div className="flex flex-col gap-2">
        {sidebarLinks.map((link) => (
          <SidebarLink
            key={link.id}
            id={link.id}
            title={link.title}
            href={link.href}
            icon={link.icon}
          />
        ))}
      </div>
    </div>
  );
}
