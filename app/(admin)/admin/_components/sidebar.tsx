"use client";

import { usePathname } from "next/navigation";

import { SidebarLink } from "@/components/sidebar-link";
import { routes } from "./links";
import { Fragment } from "react";

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href);

  return (
    <div className="flex flex-col gap-6 py-6 lg:py-10">
      <h1 className="text-lg font-semibold">Gerenciar</h1>

      <div className="flex flex-col gap-2">
        {routes?.map((link) => (
          <Fragment key={link.id}>
            <SidebarLink
              id={link.id}
              title={link.title}
              href={link.href}
              icon={link.icon}
            />

            {link.subRoutes.length > 0 && isActive(link.href) && (
              <div className="flex flex-col gap-2 ml-8 relative">
                {link.subRoutes.map((subLink) => (
                  <SidebarLink
                    key={subLink.id}
                    id={subLink.id}
                    title={subLink.title}
                    href={subLink.href}
                    icon={subLink.icon}
                  />
                ))}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
