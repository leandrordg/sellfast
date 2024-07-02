import { redirect } from "next/navigation";

import { checkRole } from "@/lib/utils";

import { Sidebar } from "./_components/sidebar";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  if (!checkRole("owner") && !checkRole("admin")) redirect("/");

  return (
    <div className="p-6 pb-20 max-w-screen-xl mx-auto flex gap-10 lg:gap-12">
      <div className="hidden md:block min-w-64 lg:min-w-72">
        <Sidebar />
      </div>
      <main className="w-full">{children}</main>
    </div>
  );
}
